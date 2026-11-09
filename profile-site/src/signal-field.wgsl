struct Flight {
  screen: vec4f,
  ship: vec4f,
  route: vec4f,
  nodes: array<vec4f, 3>,
  wake: array<vec4f, 8>,
}

@group(0) @binding(0) var<uniform> flight: Flight;

@vertex fn vertex(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
  let points = array<vec2f, 3>(vec2f(-1., -1.), vec2f(3., -1.), vec2f(-1., 3.));
  return vec4f(points[index], 0., 1.);
}

fn hash(p: vec2f) -> f32 {
  let q = fract(p * vec2f(.1031, .103));
  let n = dot(q, q.yx + vec2f(19.19));
  return fract((q.x + n) * (q.y + n));
}

fn segment(p: vec2f, a: vec2f, b: vec2f) -> f32 {
  let ab = b - a;
  return length(p - (a + ab * clamp(dot(p - a, ab) / max(dot(ab, ab), .00001), 0., 1.)));
}

fn rotation(p: vec2f, angle: f32) -> vec2f {
  let c = cos(angle);
  let s = sin(angle);
  return vec2f(c * p.x - s * p.y, s * p.x + c * p.y);
}

fn spark(p: vec2f, density: f32, time: f32) -> f32 {
  let grid = p * density;
  let cell = floor(grid);
  let h = hash(cell);
  let o = vec2f(hash(cell + vec2f(79.1, 12.3)), hash(cell + vec2f(5.23, 92.91))) * .7 + vec2f(.15);
  let d = length(fract(grid) - o);
  let glow = exp(-d * d * (380. - h * 230.)) * step(.885, h);
  return glow * (.72 + .28 * sin(time * 1.6 + h * 89.));
}

@fragment fn fragment(@builtin(position) pixel: vec4f) -> @location(0) vec4f {
  let uv = pixel.xy / flight.screen.xy;
  let unit = vec2f(flight.screen.x / flight.screen.y, 1.);
  let time = flight.screen.z;
  let centre = vec2f(.52, .49);
  let p = (uv - centre) * unit;
  let r = length(p);
  let edge = length((uv - vec2f(.5)) * vec2f(.85, 1.));
  let green = vec3f(.39, .93, .77);
  let amber = vec3f(1., .76, .32);
  let grid = abs(fract(p * 11. + vec2f(.5)) - vec2f(.5));
  let lattice = (1. - smoothstep(.004, .023, min(grid.x, grid.y))) * exp(-edge * 1.8);
  let mist = exp(-dot(p + vec2f(.12, .09), p + vec2f(.12, .09)) * 5.5);
  var colour = vec3f(.021, .051, .066) + vec3f(.022, .124, .139) * mist;
  colour += vec3f(.07, .26, .27) * lattice * .28;
  colour += vec3f(.62, .86, .94) * (spark(p + vec2f(3., 5.), 58., time) * .59);
  colour += vec3f(.92, .77, .54) * (spark(p + vec2f(2., 4.), 27., time + 10.) * .69);

  let radius = .227;
  let local = rotation(p / radius, .27);
  let disk = dot(local, local);
  let aura = exp(-abs(r - radius) * 43.);
  colour += vec3f(.045, .39, .36) * aura * .31;
  if (disk < 1.) {
    let z = sqrt(1. - disk);
    let normal = vec3f(local, z);
    let lit = clamp(dot(normal, normalize(vec3f(-.6, -.66, .72))), 0., 1.);
    let meridian = abs(sin((atan2(normal.x, normal.z) + time * .057) * 15.));
    let parallel = abs(sin(asin(normal.y) * 23.));
    let lines = 1. - smoothstep(.027, .145, min(meridian, parallel));
    let grain = hash(floor(pixel.xy));
    let band = .5 + .5 * sin(normal.y * 62. + sin(normal.x * 6. + time * .15) * 2.);
    let rim = pow(1. - z, 3.3);
    colour = vec3f(.028, .091, .106) + vec3f(.031, .165, .145) * lit;
    colour += green * (.15 * lit * lines + .29 * rim + .024 * grain + .034 * band * lit);
  }

  let tilt = rotation(p, .39);
  let orbit = length(tilt * vec2f(1., 2.27));
  let halo = exp(-abs(orbit - .323) * 132.) * .32;
  let bands = (1. - smoothstep(.0009, .0035, abs(orbit - .349))) * .6 +
    (1. - smoothstep(.0009, .0035, abs(orbit - .314))) * .73 +
    (1. - smoothstep(.0008, .0030, abs(orbit - .376))) * .28;
  let exposure = select(1., .10, disk < 1. && tilt.y < 0.);
  colour += amber * (bands + halo) * exposure;
  let outerOrbit = abs(length(rotation(p, -.2) * vec2f(1., 1.26)) - .408);
  colour += vec3f(.11, .43, .4) * (1. - smoothstep(.0007, .0025, outerOrbit)) * .46;

  for (var i = 0u; i < 3u; i += 1u) {
    let relay = flight.nodes[i];
    let node = (relay.xy - centre) * unit;
    let d = length(p - node);
    let route = segment(p, node, vec2f(0.));
    let intensity = .105 + relay.z * .43;
    let laser = (1. - smoothstep(.001, .0042, route)) + exp(-route * 75.) * .21;
    let pulse = exp(-abs(d - relay.w * .16) * 103.) * max(1. - relay.w, 0.) * relay.z;
    colour += mix(amber, green, relay.z) * (intensity * laser + exp(-d * 25.) * (.18 + relay.z * .28) + pulse * .58);
  }
  let ship = (flight.ship.xy - centre) * unit;
  if (flight.route.w > .5) {
    let destination = (flight.route.xy - centre) * unit;
    let d = segment(p, ship, destination);
    let dotMask = step(.58, fract(length(p - ship) * 37. - time * 1.8));
    colour += amber * dotMask * (1. - smoothstep(.001, .0037, d)) * .46;
  }
  var front = ship;
  for (var i = 0u; i < 8u; i += 1u) {
    let point = flight.wake[i];
    let back = (point.xy - centre) * unit;
    let d = segment(p, front, back);
    colour += amber * exp(-d * 178.) * point.z * .31;
    front = back;
  }

  let vignette = 1. - .37 * smoothstep(.36, .66, edge);
  return vec4f(min(colour * vignette, vec3f(1.)), 1.);
}
