import { Route } from '../App';
import { page, panel, button, press, badge, COLORS, BORDER_THIN } from '../theme';

interface Props { navigate: (r: Route) => void; }

export default function HomePage({ navigate }: Props) {
  return (
    <div style={{ ...page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ ...panel, maxWidth: 720, width: '100%', textAlign: 'center' }}>
        <span style={badge(COLORS.yellow)}>C# Windows Forms Application</span>

        <h1 style={{ fontSize: '2.1rem', fontWeight: 900, color: COLORS.ink, margin: '18px 0 4px' }}>
          Hafiz Sweets
        </h1>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: COLORS.sub, marginBottom: 28 }}>
          Simulation &amp; Queuing Calculator
        </h2>

        <div style={{ border: BORDER_THIN, padding: '20px 24px', marginBottom: 28, textAlign: 'left' }}>
          <h4 style={{ color: COLORS.ink, fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 14, textAlign: 'center' }}>
            Group Members
          </h4>
          {[
            ['Doshab Hussain', 'B22110106021'],
            ['Amna Nehal', 'B22110106016'],
            ['Alishna Azhar', 'B22110106013'],
            ['Huzaifa Arain', 'B22110106028'],
            ['M. Hassaan Mushtaq', 'B22110106049'],
            ['Warisha Anwer', 'B22110106089'],
            ['Abdul Rafay', 'B22110106004'],
          ].map(([name, id]) => (
            <div key={id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '7px 0', borderBottom: '1px solid #ddd',
            }}>
              <span style={{ color: COLORS.ink, fontSize: 14, fontWeight: 600 }}>• {name}</span>
              <span style={{ color: COLORS.sub, fontSize: 13, fontFamily: 'monospace', fontWeight: 700 }}>{id}</span>
            </div>
          ))}
        </div>

        <h3 style={{ color: COLORS.ink, marginBottom: 16, fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>Select Mode</h3>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('queue')} style={button(COLORS.blue, { big: true })}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Queuing Calculator</button>
          <button onClick={() => navigate('simulation')} style={button(COLORS.pink, { big: true })}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Simulator</button>
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={() => navigate('download')} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Download C# Source Code</button>
        </div>
      </div>
    </div>
  );
}
