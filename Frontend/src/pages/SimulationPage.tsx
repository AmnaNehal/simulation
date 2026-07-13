import { Route } from '../App';
import { page, panelFlat, panel, button, press, badge, COLORS, BORDER_THIN } from '../theme';

interface Props { navigate: (r: Route) => void; }

const models = [
  { id: 'sim-mms' as Route, name: 'M/M/S', full: 'Multiple Server Markovian Queue', desc: 'Poisson arrivals + configurable service distribution' },
  { id: 'sim-mgs' as Route, name: 'M/G/S', full: 'General Service Time Queue', desc: 'Poisson arrivals + general service distributions' },
  { id: 'sim-ggs' as Route, name: 'G/G/S', full: 'General Queuing System', desc: 'Poisson arrivals + general service, no priority' },
  { id: 'sim-live' as Route, name: 'Live Simulator', full: 'Animated Real-Time Queue', desc: 'Watch customer sprites arrive, queue, and get served on a live canvas' },
];

const metrics = [
  ['W', 'Waiting Time', 'Average time customers spend waiting'],
  ['Q', 'Queue Length', 'Average number of customers in queue'],
  ['U', 'Utilization', 'Server utilization percentage'],
  ['T', 'Throughput', 'Customers served per time unit'],
];

export default function SimulationPage({ navigate }: Props) {
  return (
    <div style={page}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={badge(COLORS.pink)}>Discrete Event Simulation</span>
          <h1 style={{ color: COLORS.ink, fontSize: '2.3rem', fontWeight: 900, margin: '14px 0 10px' }}>Simulation Tools</h1>
          <p style={{ color: COLORS.sub, fontSize: '1rem', maxWidth: 520, margin: '0 auto', fontWeight: 600 }}>
            Select a simulation model to analyze system behavior — no priority queuing, multiple service distributions available
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 22, marginBottom: 40 }}>
          {models.map(m => (
            <div key={m.id} onClick={() => navigate(m.id)} style={{ ...panel, cursor: 'pointer' }}>
              <h3 style={{ color: COLORS.ink, fontSize: '1.5rem', fontWeight: 900, marginBottom: 14 }}>{m.name}</h3>
              <p style={{ color: COLORS.ink, fontSize: 13, fontWeight: 700, marginBottom: 6 }}>{m.full}</p>
              <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 500 }}>{m.desc}</p>
              <button style={{ ...button(COLORS.ink), width: '100%', color: COLORS.surface, marginTop: 18 }}>Start Simulation →</button>
            </div>
          ))}
        </div>

        <div style={{ ...panelFlat, padding: 28, textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ color: COLORS.ink, marginBottom: 14, fontWeight: 800 }}>Simulation Metrics</h3>
          <p style={{ color: COLORS.sub, marginBottom: 20, fontWeight: 500 }}>
            Comprehensive analysis of queueing systems including performance metrics and statistical outputs.
          </p>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {metrics.map(([sym, lbl]) => (
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
