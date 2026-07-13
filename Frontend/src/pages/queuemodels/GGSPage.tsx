import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, select, label as lbl, button, press, errorBox, COLORS } from '../../theme';

interface Props { navigate: (r: Route) => void; }

const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
const needsVariance = (d: string) => d !== 'exponential' && d !== 'poisson';

export default function GGSPage({ navigate }: Props) {
  const [servers, setServers] = useState('2');
  const [iaDist, setIaDist] = useState('exponential');
  const [svcDist, setSvcDist] = useState('exponential');
  const [meanIA, setMeanIA] = useState('10');
  const [varIA, setVarIA] = useState('20');
  const [meanSvc, setMeanSvc] = useState('8');
  const [varSvc, setVarSvc] = useState('25');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const getCa2 = () => {
    const m = parseFloat(meanIA);
    if (iaDist === 'exponential') return 1;
    if (iaDist === 'poisson') return m / Math.pow(m, 2);
    return parseFloat(varIA) / Math.pow(m, 2);
  };
  const getCs2 = () => {
    const m = parseFloat(meanSvc);
    if (svcDist === 'exponential') return 1;
    if (svcDist === 'poisson') return m / Math.pow(m, 2);
    return parseFloat(varSvc) / Math.pow(m, 2);
  };

  const calculate = () => {
    const lambda = 1 / parseFloat(meanIA);
    const mu = 1 / parseFloat(meanSvc);
    const S = parseInt(servers);
    if (isNaN(lambda) || isNaN(mu) || isNaN(S) || S <= 0) { setError('Enter valid values.'); return; }
    const rho = lambda / (S * mu);
    if (rho >= 1) { setError('ρ ≥ 1: System unstable.'); setResult(null); return; }
    const Ca2 = getCa2(), Cs2 = getCs2();
    let P0inv = 0;
    for (let k = 0; k < S; k++) P0inv += Math.pow(S * rho, k) / factorial(k);
    P0inv += Math.pow(S * rho, S) / (factorial(S) * (1 - rho));
    const P0 = 1 / P0inv;
    const Lq_mm = P0 * (Math.pow(lambda / mu, S) * rho) / (factorial(S) * Math.pow(1 - rho, 2));
    const Lq = Lq_mm * (Ca2 + Cs2) / 2;
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Ls = lambda * Ws;
    setResult({ rho, Ca2, Cs2, Lq, Wq, Ws, Ls, idle: 1 - rho });
    setError('');
  };

  return (
    <ModelLayout title="G/G/S Queue Model" subtitle="General arrivals and service, multiple servers (Whitt Approx.)" badge="G/G/S Calculator" navigate={navigate} back="queue" accentColor={COLORS.pink}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div>
            <label style={lbl}>Number of Servers (S)</label>
            <input type="number" value={servers} onChange={e => setServers(e.target.value)} step="1" min="1" style={input} />
          </div>
          <div>
            <label style={lbl}>Interarrival Distribution</label>
            <select value={iaDist} onChange={e => setIaDist(e.target.value)} style={select}>
              <option value="exponential">Exponential</option>
              <option value="poisson">Poisson</option>
              <option value="normal">Normal</option>
              <option value="uniform">Uniform</option>
              <option value="gamma">Gamma</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Mean Interarrival Time</label>
            <input type="number" value={meanIA} onChange={e => setMeanIA(e.target.value)} step="0.1" min="0.1" style={input} />
          </div>
          {needsVariance(iaDist) && <div>
            <label style={lbl}>Variance Interarrival</label>
            <input type="number" value={varIA} onChange={e => setVarIA(e.target.value)} step="0.1" min="0" style={input} />
          </div>}
          <div>
            <label style={lbl}>Service Distribution</label>
            <select value={svcDist} onChange={e => setSvcDist(e.target.value)} style={select}>
              <option value="exponential">Exponential</option>
              <option value="poisson">Poisson</option>
              <option value="normal">Normal</option>
              <option value="uniform">Uniform</option>
              <option value="gamma">Gamma</option>
            </select>
          </div>
          <div>
            <label style={lbl}>Mean Service Time</label>
            <input type="number" value={meanSvc} onChange={e => setMeanSvc(e.target.value)} step="0.1" min="0.1" style={input} />
          </div>
          {needsVariance(svcDist) && <div>
            <label style={lbl}>Variance Service</label>
            <input type="number" value={varSvc} onChange={e => setVarSvc(e.target.value)} step="0.1" min="0" style={input} />
          </div>}
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={calculate} style={{ ...button(COLORS.pink), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Calculate</button>
          <button onClick={() => { setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>
      {result && (
        <ResultCard accentColor={COLORS.pink} metrics={[
          { label: 'Customers in System (Ls)', value: result.Ls.toFixed(3) },
          { label: 'Time in System (Ws)', value: result.Ws.toFixed(3) },
          { label: 'Response Time (R)', value: result.Ws.toFixed(3) },
          { label: 'Customers in Queue (Lq)', value: result.Lq.toFixed(3) },
          { label: 'Time in Queue (Wq)', value: result.Wq.toFixed(3) },
          { label: 'Utilization (ρ)', value: `${(result.rho * 100).toFixed(1)}%` },
          { label: 'Idle Time', value: `${(result.idle * 100).toFixed(1)}%` },
          { label: 'Ca²', value: result.Ca2.toFixed(3) },
          { label: 'Cs²', value: result.Cs2.toFixed(3) },
        ]} />
      )}
    </ModelLayout>
  );
}
