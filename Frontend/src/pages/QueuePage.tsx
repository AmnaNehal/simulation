import { Route } from '../App';
import { page, panelFlat, panel, button, press, badge, COLORS, BORDER_THIN } from '../theme';

interface Props { navigate: (r: Route) => void; }

const models = [
  { id: 'mm1' as Route, name: 'M/M/1', full: 'Single Server Queue', desc: 'Poisson arrivals, exponential service, single server' },
  { id: 'mms' as Route, name: 'M/M/S', full: 'Multiple Server Queue', desc: 'Poisson arrivals, exponential service, multiple servers' },
  { id: 'mg1' as Route, name: 'M/G/1', full: 'Single Server General', desc: 'Poisson arrivals, general service time, single server' },
  { id: 'mgs' as Route, name: 'M/G/S', full: 'Multiple Server General', desc: 'Poisson arrivals, general service time, multiple servers' },
  { id: 'gg1' as Route, name: 'G/G/1', full: 'General Single Server', desc: 'General arrivals, general service time, single server' },
  { id: 'ggs' as Route, name: 'G/G/S', full: 'General Multiple Server', desc: 'General arrivals, general service time, multiple servers' },
];

export default function QueuePage({ navigate }: Props) {
  return (
    <div style={page}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={badge(COLORS.blue)}>Queuing Theory Calculator</span>
          <h1 style={{ color: COLORS.ink, fontSize: '2.3rem', fontWeight: 900, margin: '14px 0 10px' }}>Queue Models</h1>
          <p style={{ color: COLORS.sub, fontSize: '1rem', maxWidth: 500, margin: '0 auto', fontWeight: 600 }}>
            Select a queuing model to analyze waiting lines, service times, and system performance
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22, marginBottom: 40 }}>
          {models.map(m => (
            <div key={m.id} onClick={() => navigate(m.id)} style={{ ...panel, cursor: 'pointer' }}>
              <h3 style={{ color: COLORS.ink, fontSize: '1.5rem', fontWeight: 900, marginBottom: 14 }}>{m.name}</h3>
              <p style={{ color: COLORS.ink, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{m.full}</p>
              <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 500 }}>{m.desc}</p>
              <button style={{ ...button(COLORS.ink), width: '100%', color: COLORS.surface, marginTop: 18 }}>Analyze Model →</button>
            </div>
          ))}
        </div>

        <div style={{ ...panelFlat, padding: 28, textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ color: COLORS.ink, marginBottom: 14, fontWeight: 800 }}>About Queuing Models</h3>
          <p style={{ color: COLORS.sub, marginBottom: 20, fontWeight: 500 }}>
            Queuing theory helps analyze waiting lines and optimize service systems.
            Each model represents different arrival patterns, service times, and server configurations.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['M', 'Markovian/Poisson'], ['G', 'General Distribution'], ['s', 'Servers Count']].map(([sym, lbl]) => (
              <div key={sym} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 40, height: 40, border: BORDER_THIN,
                  background: COLORS.surface, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: COLORS.ink, fontWeight: 800, fontSize: 18, margin: '0 auto 8px',
                }}>{sym}</div>
                <span style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>{lbl}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={() => navigate('home')} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >← Back to Home</button>
        </div>
      </div>
    </div>
  );
}
