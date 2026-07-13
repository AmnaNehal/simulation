import { COLORS, BORDER, BORDER_THIN, SHADOW } from '../theme';

interface Metric { label: string; value: string; }

interface Props { metrics: Metric[]; accentColor?: string; }

export default function ResultCard({ metrics, accentColor = COLORS.yellow }: Props) {
  return (
    <div style={{
      background: COLORS.surface, border: BORDER, boxShadow: SHADOW,
      borderRadius: 0, padding: 28, marginTop: 28,
    }}>
      <h3 style={{ color: COLORS.ink, marginBottom: 20, fontSize: '1.1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        Performance Metrics
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
        {metrics.map(({ label, value }) => (
          <div key={label} style={{
            background: accentColor, border: BORDER_THIN,
            borderRadius: 0, padding: '16px 14px', textAlign: 'center',
          }}>
            <div style={{ color: COLORS.ink, fontSize: '1.4rem', fontWeight: 800, marginBottom: 4 }}>{value}</div>
            <div style={{ color: COLORS.ink, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.3 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
