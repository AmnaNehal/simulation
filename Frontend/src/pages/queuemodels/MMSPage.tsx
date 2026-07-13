import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, label as lbl, button, press, errorBox, COLORS, infoBox } from '../../theme';

interface Props { navigate: (r: Route) => void; }

const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);

export default function MMSPage({ navigate }: Props) {
  const [servers, setServers] = useState('2');
  const [meanIA, setMeanIA] = useState('2');
  const [meanSvc, setMeanSvc] = useState('1.8');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const lambda = 1 / parseFloat(meanIA);
    const mu = 1 / parseFloat(meanSvc);
    const S = parseInt(servers);
    if (isNaN(lambda) || isNaN(mu) || isNaN(S) || S <= 0) { setError('Enter valid positive numbers.'); setResult(null); return; }
    const rho = lambda / (S * mu);
    if (rho >= 1) { setError('ρ ≥ 1: System unstable.'); setResult(null); return; }
    let P0inv = 0;
    for (let k = 0; k < S; k++) P0inv += Math.pow(S * rho, k) / factorial(k);
    P0inv += Math.pow(S * rho, S) / (factorial(S) * (1 - rho));
    const P0 = 1 / P0inv;
    const Lq = P0 * (Math.pow(lambda / mu, S) * rho) / (factorial(S) * Math.pow(1 - rho, 2));
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Ls = lambda * Ws;
    setResult({ rho, P0, Lq, Wq, Ws, Ls, idle: 1 - rho });
    setError('');
  };

  return (
    <ModelLayout title="M/M/S Queue Model" subtitle="Multiple servers with Poisson arrivals and exponential service" badge="M/M/S Calculator" navigate={navigate} back="queue" accentColor={COLORS.blue}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {([
            ['Number of Servers (S)', servers, setServers, '1'],
            ['Mean Interarrival Time', meanIA, setMeanIA, '0.1'],
            ['Mean Service Time', meanSvc, setMeanSvc, '0.1'],
          ] as [string, string, typeof setServers, string][]).map(([l, val, setter, step]) => (
            <div key={l}>
              <label style={lbl}>{l}</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} step={step} min={step} style={input} />
            </div>
          ))}
          <div>
            <label style={lbl}>Arrival / Service Distribution</label>
            <div style={infoBox(COLORS.mute)}>Poisson / Exponential</div>
          </div>
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={calculate} style={{ ...button(COLORS.blue), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Calculate</button>
          <button onClick={() => { setServers('2'); setMeanIA('2'); setMeanSvc('1.8'); setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>

      {result && (
        <ResultCard accentColor={COLORS.blue} metrics={[
          { label: 'Customers in System (Ls)', value: result.Ls.toFixed(3) },
          { label: 'Time in System (Ws)', value: result.Ws.toFixed(3) },
          { label: 'Response Time (R)', value: result.Ws.toFixed(3) },
          { label: 'Customers in Queue (Lq)', value: result.Lq.toFixed(3) },
          { label: 'Time in Queue (Wq)', value: result.Wq.toFixed(3) },
          { label: 'Server Utilization (ρ)', value: `${(result.rho * 100).toFixed(1)}%` },
          { label: 'Idle Time', value: `${(result.idle * 100).toFixed(1)}%` },
          { label: 'P₀ (empty system)', value: result.P0.toFixed(4) },
        ]} />
      )}
      <div style={{ marginTop: 24, ...panel, boxShadow: 'none', border: '2px solid #000' }}>
        <h4 style={{ color: COLORS.ink, marginBottom: 10, fontWeight: 800 }}>M/M/S Formulas</h4>
        <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>ρ = λ/(Sμ) &nbsp;|&nbsp; Lq = P₀(λ/μ)ˢρ / (S!(1-ρ)²) &nbsp;|&nbsp; Wq = Lq/λ &nbsp;|&nbsp; Ws = Wq + 1/μ &nbsp;|&nbsp; Ls = λWs</p>
      </div>
    </ModelLayout>
  );
}
