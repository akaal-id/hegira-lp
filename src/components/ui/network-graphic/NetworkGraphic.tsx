import styles from "./NetworkGraphic.module.css";

const HUB = { x: 200, y: 180 };

const NODES = [
  { x: 70, y: 60, r: 10, pulse: true },
  { x: 330, y: 50, r: 8 },
  { x: 360, y: 170, r: 11, pulse: true },
  { x: 300, y: 300, r: 8 },
  { x: 120, y: 320, r: 10 },
  { x: 45, y: 220, r: 8 },
  { x: 200, y: 40, r: 7 },
];

const PEER_LINKS: Array<[number, number]> = [
  [0, 1],
  [3, 4],
  [5, 0],
];

export default function NetworkGraphic() {
  return (
    <svg
      viewBox="0 0 400 360"
      role="img"
      aria-label="Network diagram showing Hegira at the center, connected to organizers, sponsors, exhibitors, and government partners, with additional connections forming between them."
      className={styles.graphic}
    >
      <defs>
        <linearGradient id="networkLine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-hegra-yellow)" />
          <stop offset="100%" stopColor="var(--color-hegra-yellow)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {NODES.map((node, i) => (
        <line
          key={`hub-${i}`}
          x1={HUB.x}
          y1={HUB.y}
          x2={node.x}
          y2={node.y}
          stroke="url(#networkLine)"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />
      ))}

      {PEER_LINKS.map(([a, b], i) => (
        <line
          key={`peer-${i}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke="var(--color-hegra-chino)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {NODES.map((node, i) => (
        <g key={`node-${i}`}>
          {node.pulse && (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 6}
              fill="var(--color-hegra-yellow)"
              opacity="0.25"
              className={styles.pulse}
            />
          )}
          <circle cx={node.x} cy={node.y} r={node.r} fill="var(--color-hegra-white)" stroke="var(--color-hegra-navy)" strokeOpacity="0.15" strokeWidth="2" />
          <circle cx={node.x} cy={node.y} r={node.r - 4} fill="var(--color-hegra-chino)" />
        </g>
      ))}

      <circle cx={HUB.x} cy={HUB.y} r="26" fill="var(--color-hegra-yellow)" />
      <circle cx={HUB.x} cy={HUB.y} r="26" fill="none" stroke="var(--color-hegra-turquoise)" strokeWidth="2" className={styles.pulse} />
      <text
        x={HUB.x}
        y={HUB.y + 5}
        textAnchor="middle"
        fill="var(--color-hegra-navy)"
        fontSize="11"
        fontWeight="700"
      >
        H
      </text>
    </svg>
  );
}
