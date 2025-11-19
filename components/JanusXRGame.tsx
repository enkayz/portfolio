import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Stars } from '@react-three/drei';

type Room = {
  id: string;
  name: string;
  description: string;
  difficulty: 'Chill' | 'Intense' | 'Legendary';
  energy: number;
  population: number;
  soundtrack: string;
  color: string;
  position: [number, number, number];
};

type VisitLedger = Record<string, number>;

type Achievement = {
  id: string;
  icon: string;
  title: string;
  description: string;
  condition: (state: GameStateSnapshot) => boolean;
  progress?: (state: GameStateSnapshot) => number;
};

type GameStateSnapshot = {
  visits: VisitLedger;
  totalVisits: number;
  uniqueRooms: number;
  system8Runs: number;
  activeRoom: Room;
  source: 'portal' | 'lobby';
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const BASE_ROOMS: Room[] = [
  {
    id: 's8-drift',
    name: 'System 8 Driftway',
    description: 'Neon boosted hover lanes that made System 8 a viral Steam free2play obsession.',
    difficulty: 'Chill',
    energy: 72,
    population: 28,
    soundtrack: 'Wavekick Anthem',
    color: '#18ffff',
    position: [-3, 0, 0],
  },
  {
    id: 'janus-vault',
    name: 'JanusXR Vault Run',
    description: 'Heist puzzle corridors with twitch aim duels and co-op hacking.',
    difficulty: 'Intense',
    energy: 84,
    population: 19,
    soundtrack: 'Cipher Collapse',
    color: '#ff61b6',
    position: [0, 0, 0],
  },
  {
    id: 'infinite-towers',
    name: 'Infinite Towers Royale',
    description: 'Endless rogue-lite race up gravity-bending towers with 64 runners.',
    difficulty: 'Legendary',
    energy: 95,
    population: 41,
    soundtrack: 'Ascendant Pulse',
    color: '#ffb347',
    position: [3, 0, 0],
  },
];

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-dive',
    icon: '🌀',
    title: 'First Dive',
    description: 'Slip through any JanusXR portal.',
    condition: (state) => state.totalVisits >= 1,
    progress: (state) => clamp(state.totalVisits / 1, 0, 1),
  },
  {
    id: 'system-8-superfan',
    icon: '8️⃣',
    title: 'System 8 Superfan',
    description: 'Replay the Driftway twice because System 8 is always exciting!!',
    condition: (state) => state.system8Runs >= 2,
    progress: (state) => clamp(state.system8Runs / 2, 0, 1),
  },
  {
    id: 'tour-guide',
    icon: '🌐',
    title: 'XR Tour Guide',
    description: 'Visit every multiplayer room in a single session.',
    condition: (state) => state.uniqueRooms === BASE_ROOMS.length,
    progress: (state) => clamp(state.uniqueRooms / BASE_ROOMS.length, 0, 1),
  },
  {
    id: 'viral-clip',
    icon: '📹',
    title: 'Viral Clip Machine',
    description: 'Enter any room with hype energy above 90.',
    condition: (state) => state.activeRoom.energy >= 90,
    progress: (state) => clamp(state.activeRoom.energy / 90, 0, 1),
  },
  {
    id: 'social-hopper',
    icon: '🤝',
    title: 'Lobby Social Hopper',
    description: 'Join a session directly from the multiplayer lobby.',
    condition: (state) => state.source === 'lobby',
    progress: (state) => (state.source === 'lobby' ? 1 : 0),
  },
];

const buildSnapshot = (
  visits: VisitLedger,
  activeRoom: Room,
  source: 'portal' | 'lobby',
): GameStateSnapshot => {
  const totalVisits = Object.values(visits).reduce((acc, value) => acc + value, 0);
  const system8Runs = visits['s8-drift'] ?? 0;
  const uniqueRooms = Object.keys(visits).length;

  return {
    visits,
    totalVisits,
    uniqueRooms,
    system8Runs,
    activeRoom,
    source,
  };
};

type RoomCardProps = {
  room: Room;
  isActive: boolean;
  onSelect: (source: 'portal' | 'lobby') => void;
};

const RoomPortal: React.FC<RoomCardProps> = ({ room, isActive, onSelect }) => {
  const pulse = isActive ? 1.2 : 0.8;
  const wobble = isActive ? 0.02 : 0.01;

  return (
    <group position={room.position}>
      <mesh
        onClick={() => onSelect('portal')}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'default';
        }}
        scale={[pulse, pulse, pulse]}
      >
        <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
        <meshStandardMaterial
          color={room.color}
          emissive={room.color}
          emissiveIntensity={isActive ? 1.6 : 0.6}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.45, 64]} />
        <meshStandardMaterial color={room.color} transparent opacity={0.45} />
      </mesh>
      <mesh position={[0, -0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.15, 32]} />
        <meshStandardMaterial color="#020617" opacity={0.8} transparent />
      </mesh>
      <Html
        position={[0, 1.5 + (isActive ? 0.25 : 0), 0]}
        center
        distanceFactor={10}
        className="text-center"
      >
        <div className="backdrop-blur-md bg-black/60 px-3 py-2 rounded-md border border-white/20">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">{room.difficulty}</p>
          <p className="text-sm font-semibold text-white">{room.name}</p>
        </div>
      </Html>
      <ambientLight intensity={wobble} />
    </group>
  );
};

const StatPill: React.FC<{ label: string; value: string; accent?: string }> = ({
  label,
  value,
  accent = 'text-cyan-300',
}) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3 flex flex-col">
    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</span>
    <span className={`text-lg font-semibold ${accent}`}>{value}</span>
  </div>
);

const JanusXRGame: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(BASE_ROOMS);
  const [activeRoomId, setActiveRoomId] = useState<string>(BASE_ROOMS[0].id);
  const [visits, setVisits] = useState<VisitLedger>({});
  const [log, setLog] = useState<string[]>([
    'Booting System 8 hypervisor…',
    'JanusXR bridge locked to WebGL layer.',
  ]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  const activeRoom = useMemo(
    () => rooms.find((room) => room.id === activeRoomId) ?? rooms[0],
    [rooms, activeRoomId],
  );

  const pushLog = useCallback((entry: string) => {
    setLog((previous) => [entry, ...previous].slice(0, 8));
  }, []);

  const tryUnlockAchievements = useCallback(
    (snapshot: GameStateSnapshot) => {
      setUnlockedAchievements((prev) => {
        const next = new Set(prev);
        ACHIEVEMENTS.forEach((achievement) => {
          if (!next.has(achievement.id) && achievement.condition(snapshot)) {
            next.add(achievement.id);
            pushLog(`Achievement unlocked: ${achievement.title}`);
          }
        });
        return next;
      });
    },
    [pushLog],
  );

  const handleRoomHop = useCallback(
    (roomId: string, source: 'portal' | 'lobby') => {
      const targetRoom = rooms.find((room) => room.id === roomId);
      if (!targetRoom) return;

      setActiveRoomId(roomId);
      setVisits((previous) => {
        const updated: VisitLedger = {
          ...previous,
          [roomId]: (previous[roomId] ?? 0) + 1,
        };
        const snapshot = buildSnapshot(updated, targetRoom, source);
        tryUnlockAchievements(snapshot);
        return updated;
      });

      pushLog(
        `${source === 'portal' ? 'Portal dive' : 'Lobby squad'} → ${targetRoom.name} | Energy ${targetRoom.energy}`,
      );
    },
    [rooms, pushLog, tryUnlockAchievements],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRooms((previous) =>
        previous.map((room) => ({
          ...room,
          population: clamp(room.population + Math.floor(Math.random() * 5) - 2, 6, 64),
          energy: clamp(room.energy + (Math.random() - 0.5) * 6, 60, 99),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const snapshot = useMemo(() => buildSnapshot(visits, activeRoom, 'portal'), [visits, activeRoom]);

  const narrativeBeats = useMemo(
    () => [
      {
        title: 'Matchmaking Surge',
        detail:
          'System 8 servers detect your hype rating and queue you with thrill-chasers.',
      },
      {
        title: 'Momentum Capture',
        detail: `Ride the ${activeRoom.name} lines, chaining tricks for viral-ready replays.`,
      },
      {
        title: 'Achievement Cascade',
        detail: 'Unlock badges mid-run and flex them across multiplayer rooms in real time.',
      },
      {
        title: 'JanusXR Encore',
        detail: 'Replay instantly with a new squad while the soundtrack remixes live.',
      },
    ],
    [activeRoom.name],
  );

  return (
    <main className="min-h-screen bg-[#01030a] text-white pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-10 space-y-10">
        <section className="bg-gradient-to-br from-cyan-500/20 via-slate-900 to-purple-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(16,207,255,0.25)]">
          <p className="text-xs uppercase tracking-[0.45em] text-cyan-200">JanusXR Playthrough</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 leading-tight">
            System 8: Viral Free2Play WebGL Takeover
          </h1>
          <p className="mt-4 text-lg text-slate-200">
            Dive into an always-on JanusXR arena rendered fully in WebGL. Sprint across hover
            highways, squad up in multiplayer rooms, and chase achievements like a headline Steam hit.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <StatPill label="Active Room" value={activeRoom.name} />
            <StatPill label="Energy" value={`${Math.round(activeRoom.energy)}%`} accent="text-pink-300" />
            <StatPill
              label="Population"
              value={`${activeRoom.population} players`}
              accent="text-amber-200"
            />
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <div className="aspect-video">
              <Canvas camera={{ position: [0, 4, 9], fov: 55 }}>
                <color attach="background" args={[0, 0, 0]} />
                <ambientLight intensity={0.6} />
                <pointLight position={[5, 6, 5]} intensity={1.3} color="#8be9fd" />
                <pointLight position={[-5, 3, -4]} intensity={1.1} color="#fcb1ff" />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                  <planeGeometry args={[25, 25]} />
                  <meshStandardMaterial color="#020617" transparent opacity={0.85} />
                </mesh>
                <Stars radius={80} depth={50} count={2000} factor={4} saturation={0} fade />
                <Suspense fallback={null}>
                  {rooms.map((room) => (
                    <RoomPortal
                      key={room.id}
                      room={room}
                      isActive={room.id === activeRoomId}
                      onSelect={(source) => handleRoomHop(room.id, source)}
                    />
                  ))}
                </Suspense>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={0.6}
                  maxPolarAngle={Math.PI / 2.5}
                  minPolarAngle={Math.PI / 3}
                />
              </Canvas>
            </div>
            <div className="p-6 space-y-3 bg-gradient-to-br from-slate-900/60 to-black/60">
              <h2 className="text-xl font-semibold">WebGL JanusXR Deck</h2>
              <p className="text-sm text-slate-300">
                Hover over the portals and click to dive into a different System 8 arena. Every hop
                counts toward viral-ready achievements and fills your replay reel.
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Playthrough Timeline</h2>
            <ul className="space-y-4">
              {narrativeBeats.map((beat) => (
                <li key={beat.title} className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <span className="text-lg font-bold text-cyan-200">▶</span>
                  </div>
                  <div>
                    <p className="font-semibold">{beat.title}</p>
                    <p className="text-sm text-slate-300">{beat.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Achievement Cascade</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {ACHIEVEMENTS.map((achievement) => {
              const unlocked = unlockedAchievements.has(achievement.id);
              const progress = achievement.progress?.(snapshot) ?? (unlocked ? 1 : 0);
              return (
                <div
                  key={achievement.id}
                  className={`rounded-2xl border p-4 backdrop-blur-md transition ${
                    unlocked
                      ? 'border-emerald-300/60 bg-emerald-400/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-semibold">{achievement.title}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        {unlocked ? 'Unlocked' : 'Locked'}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mt-3">{achievement.description}</p>
                  <div className="mt-4 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400"
                      style={{ width: `${Math.min(progress * 100, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold">Multiplayer Rooms</h2>
            <span className="text-xs uppercase tracking-[0.35em] text-slate-400">
              Live squads looking for hype
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`rounded-2xl border p-4 flex flex-col gap-3 ${
                  room.id === activeRoomId ? 'border-cyan-300/70 bg-cyan-400/10' : 'border-white/10'
                }`}
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{room.difficulty}</p>
                  <p className="text-lg font-semibold">{room.name}</p>
                  <p className="text-sm text-slate-300">{room.description}</p>
                </div>
                <div className="flex gap-3 text-sm text-slate-300">
                  <span>Energy {Math.round(room.energy)}%</span>
                  <span>•</span>
                  <span>{room.population} players</span>
                </div>
                <button
                  className="mt-auto bg-white/10 border border-white/20 rounded-xl py-2 text-sm font-semibold hover:bg-white/20 transition"
                  onClick={() => handleRoomHop(room.id, 'lobby')}
                >
                  Join Squad
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-950/80 border border-white/10 rounded-3xl p-6">
          <div className="flex flex-wrap justify-between gap-3 items-center">
            <div>
              <h2 className="text-2xl font-semibold">System 8 Relay Feed</h2>
              <p className="text-sm text-slate-300">
                Real-time commentary on your JanusXR traversal and Steam-ready achievements.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.4em] text-cyan-300">Always Exciting</span>
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {log.map((entry, index) => (
              <li
                key={`${entry}-${index}`}
                className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-slate-200"
              >
                {entry}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default JanusXRGame;
