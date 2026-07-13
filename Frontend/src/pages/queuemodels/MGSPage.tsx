import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, select, label as lbl, button, press, errorBox, COLORS } from '../../theme';

interface Props { navigate: (r: Route) => void; }

const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);

export default function MGSPage({ navigate }: Props) {
  const [servers, setServers] = useState('2');
  const [meanIA, setMeanIA] = useState('2');
  const [svcDist, setSvcDist] = useState('normal');
  const [meanSvc, setMeanSvc] = useState('1.5');
  const [varSvc, setVarSvc] = useState('2.25');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const lambda = 1 / parseFloat(meanIA);
    const mu = 1 / parseFloat(meanSvc);
    const S = parseInt(servers);
    if (isNaN(lambda) || isNaN(mu) || isNaN(S) || S <= 0) { setError('Enter valid values.'); return; }
    const rho = lambda / (S * mu);
    if (rho >= 1) { setError('ρ ≥ 1: System unstable.'); setResult(null); return; }
    const Cs2 = parseFloat(varSvc) / Math.pow(1 / mu, 2);
    // M/G/s: Hokstad approximation
    let P0inv = 0;
    for (let k = 0; k < S; k++) P0inv += Math.pow(S * rho, k) / factorial(k);
    P0inv += Math.pow(S * rho, S) / (factorial(S) * (1 - rho));
    const P0 = 1 / P0inv;
    const Lq_mm = P0 * (Math.pow(lambda / mu, S) * rho) / (factorial(S) * Math.pow(1 - rho, 2));
    const Lq = Lq_mm * (1 + Cs2) / 2;
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Ls = lambda * Ws;
    setResult({ rho, Lq, Wq, Ws, Ls, Cs2, idle: 1 - rho });
    setError('');
  };

  return (
    <ModelLayout title="M/G/S Queue Model" subtitle="Multiple servers with Poisson arrivals and general service" badge="M/G/S Calculator" navigate={navigate} back="queue" accentColor={COLORS.yellow}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div>
            <label style={lbl}>Number of Servers (S)</label>
            <input type="number" value={servers} onChange={e => setServers(e.target.value)} step="1" min="1" style={input} />
          </div>
          <div>
            <label style={lbl}>Mean Interarrival Time</label>
            <input type="number" value={meanIA} onChange={e => setMeanIA(e.target.value)} step="0.1" min="0.1" style={input} />
          </div>
          <div>
            <label style={lbl}>Service Distribution</label>
            <select value={svcDist} onChange={e => setSvcDist(e.target.value)} style={select}>
              <option value="normal">Normal</option>
              <option value="uniform">Uniform</option>
              <option value="gamma">Gamma</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Mean Service Time</label>
            <input type="number" value={meanSvc} onChange={e => setMeanSvc(e.target.value)} step="0.1" min="0.1" style={input} />
          </div>
          <div>
            <label style={lbl}>Variance Service Time</label>
            <input type="number" value={varSvc} onChange={e => setVarSvc(e.target.value)} step="0.1" min="0" style={input} />
          </div>
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={calculate} style={{ ...button(COLORS.yellow), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Calculate</button>
          <button onClick={() => { setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>
      {result && (
        <ResultCard accentColor={COLORS.yellow} metrics={[
          { label: 'Customers in System (Ls)', value: result.Ls.toFixed(3) },
          { label: 'Time in System (Ws)', value: result.Ws.toFixed(3) },
          { label: 'Response Time (R)', value: result.Ws.toFixed(3) },
          { label: 'Customers in Queue (Lq)', value: result.Lq.toFixed(3) },
          { label: 'Time in Queue (Wq)', value: result.Wq.toFixed(3) },
          { label: 'Utilization (ρ)', value: `${(result.rho * 100).toFixed(1)}%` },
          { label: 'Idle Time', value: `${(result.idle * 100).toFixed(1)}%` },
          { label: 'Cₛ² (SCV)', value: result.Cs2.toFixed(3) },
        ]} />
      )}
      <div style={{ marginTop: 24, ...panel, boxShadow: 'none', border: '2px solid #000' }}>
        <h4 style={{ color: COLORS.ink, marginBottom: 10, fontWeight: 800 }}>M/G/S (Hokstad Approximation)</h4>
        <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>Lq ≈ Lq(M/M/S) · (1 + Cₛ²) / 2 &nbsp;|&nbsp; Wq = Lq/λ &nbsp;|&nbsp; Ws = Wq + 1/μ &nbsp;|&nbsp; Ls = λWs</p>
        <p style={{ color: COLORS.sub, fontSize: 12, marginTop: 6 }}>Cₛ² (squared coefficient of variation) = variance / mean².</p>
      </div>
    </ModelLayout>
  );
}
