import shader from "./signal-field.wgsl?raw";

export async function createGpuRenderer(canvas, onLost) {
  if (!navigator.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "low-power" });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  const context = canvas.getContext("webgpu");
  if (!context) {
    device.destroy();
    return null;
  }
  const format = navigator.gpu.getPreferredCanvasFormat();
  const module = device.createShaderModule({ label: "System 8 signal field", code: shader });
  const uniforms = new Float32Array(56);
  let pipeline;
  let buffer;
  let binding;
  try {
    pipeline = await device.createRenderPipelineAsync({
      label: "Signal field renderer",
      layout: "auto",
      vertex: { module, entryPoint: "vertex" },
      fragment: { module, entryPoint: "fragment", targets: [{ format }] },
      primitive: { topology: "triangle-list" },
    });
    buffer = device.createBuffer({
      size: uniforms.byteLength,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    binding = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [{ binding: 0, resource: { buffer } }],
    });
    context.configure({ device, format, alphaMode: "opaque" });
  } catch (error) {
    device.destroy();
    throw error;
  }
  device.lost.then(onLost);

  return {
    type: "webgpu",
    draw(frame) {
      if (canvas.width !== frame.width || canvas.height !== frame.height) {
        canvas.width = frame.width;
        canvas.height = frame.height;
      }
      uniforms.set([frame.width, frame.height, frame.time, 0], 0);
      uniforms.set([frame.x, frame.y, 0, 0], 4);
      uniforms.set([frame.target?.x ?? 0, frame.target?.y ?? 0, 0, frame.target ? 1 : 0], 8);
      frame.relays.forEach((node, index) => {
        uniforms.set([node.x, node.y, node.locked ? 1 : 0, node.age], 12 + index * 4);
      });
      for (let i = 0; i < 8; i += 1) {
        const point = frame.wake[i];
        uniforms.set(point ? [point.x, point.y, point.strength, 0] : [frame.x, frame.y, 0, 0], 24 + i * 4);
      }
      device.queue.writeBuffer(buffer, 0, uniforms);
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view: context.getCurrentTexture().createView(),
          loadOp: "clear",
          storeOp: "store",
          clearValue: { r: .021, g: .051, b: .066, a: 1 },
        }],
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, binding);
      pass.draw(3);
      pass.end();
      device.queue.submit([encoder.finish()]);
    },
  };
}

function stars() {
  let seed = 3816;
  const next = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  return Array.from({ length: 184 }, () => [next(), next(), next()]);
}

export function createCanvasRenderer(canvas) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;
  const fieldStars = stars();
  let background = null;

  function paintBackground(width, height) {
    const layer = document.createElement("canvas");
    layer.width = width;
    layer.height = height;
    const c = layer.getContext("2d", { alpha: false });
    const cx = width * .52;
    const cy = height * .49;
    const sky = c.createRadialGradient(cx - height * .12, cy - height * .09, 0, cx, cy, height * .74);
    sky.addColorStop(0, "#174047");
    sky.addColorStop(.59, "#0b242e");
    sky.addColorStop(1, "#061018");
    c.fillStyle = sky;
    c.fillRect(0, 0, width, height);
    c.strokeStyle = "#8bccc623";
    c.lineWidth = 1;
    c.beginPath();
    const spacing = height / 11;
    for (let x = cx % spacing; x < width; x += spacing) {
      c.moveTo(x, 0); c.lineTo(x, height);
    }
    for (let y = cy % spacing; y < height; y += spacing) {
      c.moveTo(0, y); c.lineTo(width, y);
    }
    c.stroke();
    for (const [x, y, size] of fieldStars) {
      c.fillStyle = size > .87 ? "#ecd291bd" : "#add8db81";
      c.fillRect(x * width, y * height, size > .87 ? 2.4 : 1.1, size > .87 ? 2.4 : 1.1);
    }
    const radius = height * .227;
    c.strokeStyle = "#b29a5f72";
    for (const scale of [1.37, 1.54, 1.67]) {
      c.beginPath();
      c.ellipse(cx, cy, radius * scale, radius * scale * .44, -.39, 0, Math.PI * 2);
      c.stroke();
    }
    c.save();
    c.beginPath();
    c.arc(cx, cy, radius, 0, Math.PI * 2);
    c.clip();
    const ocean = c.createRadialGradient(cx - radius * .47, cy - radius * .47, radius * .1, cx, cy, radius);
    ocean.addColorStop(0, "#316d68");
    ocean.addColorStop(.68, "#103a43");
    ocean.addColorStop(1, "#132c37");
    c.fillStyle = ocean;
    c.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    c.translate(cx, cy);
    c.rotate(-.27);
    c.strokeStyle = "#91dfbb56";
    for (let i = -6; i <= 6; i += 1) {
      const y = i / 7;
      c.beginPath();
      c.ellipse(0, y * radius, Math.sqrt(1 - y * y) * radius, radius * .12, 0, 0, Math.PI);
      c.stroke();
    }
    for (const ratio of [.18, .37, .56, .73, .88, 1]) {
      c.beginPath();
      c.ellipse(0, 0, radius * ratio, radius, 0, 0, Math.PI * 2);
      c.stroke();
    }
    c.restore();
    c.strokeStyle = "#efca72bb";
    for (const scale of [1.37, 1.54, 1.67]) {
      c.beginPath();
      c.ellipse(cx, cy, radius * scale, radius * scale * .44, -.39, 0, Math.PI);
      c.stroke();
    }
    return layer;
  }

  return {
    type: "canvas",
    draw(frame) {
      const { width, height } = frame;
      if (!background || canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        background = paintBackground(width, height);
      }
      ctx.drawImage(background, 0, 0);
      for (const relay of frame.relays) {
        const x = relay.x * width;
        const y = relay.y * height;
        ctx.lineWidth = relay.locked ? 1.5 : 1;
        ctx.strokeStyle = relay.locked ? "#9df7cfbd" : "#d5bf7361";
        ctx.beginPath();
        ctx.moveTo(width * .52, height * .49);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (relay.locked && relay.age < 1) {
          ctx.strokeStyle = "rgba(150,242,199," + (.75 * (1 - relay.age)) + ")";
          ctx.beginPath();
          ctx.arc(x, y, (relay.age * .16 + .02) * height, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      if (frame.target) {
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = "#f6d472a5";
        ctx.beginPath();
        ctx.moveTo(frame.x * width, frame.y * height);
        ctx.lineTo(frame.target.x * width, frame.target.y * height);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      let front = frame;
      for (const point of frame.wake) {
        ctx.lineWidth = point.strength * 3 + .5;
        ctx.strokeStyle = "rgba(246,212,114," + point.strength * .63 + ")";
        ctx.beginPath();
        ctx.moveTo(front.x * width, front.y * height);
        ctx.lineTo(point.x * width, point.y * height);
        ctx.stroke();
        front = point;
      }
    },
  };
}
