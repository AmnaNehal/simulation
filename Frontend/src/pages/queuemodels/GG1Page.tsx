import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, select, label as lbl, button, press, errorBox, COLORS } from '../../theme';

interface Props { navigate: (r: Route) => void; }

export default function GG1Page({ navigate }: Props) {
  const [iaDist, setIaDist] = useState('exponential');
  const [svcDist, setSvcDist] = useState('exponential');
  const [arrivalRate, setArrivalRate] = useState('0.1');
  const [varIA, setVarIA] = useState('20');
  const [serviceRate, setServiceRate] = useState('0.125');
  const [varSvc, setVarSvc] = useState('25');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const getCa2 = () => {
    const m = 1 / parseFloat(arrivalRate);
    if (iaDist === 'exponential') return 1;
    if (iaDist === 'poisson') return m / Math.pow(m, 2);
    return parseFloat(varIA) / Math.pow(m, 2);
  };
  const getCs2 = () => {
    const m = 1 / parseFloat(serviceRate);
    if (svcDist === 'exponential') return 1;
    if (svcDist === 'poisson') return m / Math.pow(m, 2);
    return parseFloat(varSvc) / Math.pow(m, 2);
  };

  const calculate = () => {
    const lambda = parseFloat(arrivalRate);
    const mu = parseFloat(serviceRate);
    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) { setError('Enter valid values.'); return; }
    const rho = lambda / mu;
    if (rho >= 1) { setError('ρ ≥ 1: System unstable.'); setResult(null); return; }
    const Ca2 = getCa2(), Cs2 = getCs2();
    const Lq = (Math.pow(rho, 2) * (1 + Cs2) * (Ca2 + Math.pow(rho, 2) * Cs2)) / (2 * (1 - rho) * (1 + Math.pow(rho, 2) * Cs2));
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Ls = lambda * Ws;
    setResult({ rho, Ca2, Cs2, Lq, Wq, Ws, Ls, idle: 1 - rho });
    setError('');
  };

  const needsVariance = (d: string) => d !== 'exponential' && d !== 'poisson';

  return (
    <ModelLayout title="G/G/1 Queue Model" subtitle="General arrivals and general service, single server" badge="G/G/1 Calculator" navigate={navigate} back="queue" accentColor={COLORS.pink}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
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
            <label style={lbl}>Arrival Rate (λ)</label>
            <input type="number" value={arrivalRate} onChange={e => setArrivalRate(e.target.value)} step="0.001" min="0.001" style={input} />
          </div>
          {needsVariance(iaDist) && (
            <div>
              <label style={lbl}>Variance Interarrival</label>
              <input type="number" value={varIA} onChange={e => setVarIA(e.target.value)} step="0.1" min="0" style={input} />
            </div>
          )}
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
            <label style={lbl}>Service Rate (μ)</label>
            <input type="number" value={serviceRate} onChange={e => setServiceRate(e.target.value)} step="0.001" min="0.001" style={input} />
          </div>
          {needsVariance(svcDist) && (
            <div>
              <label style={lbl}>Variance Service</label>
              <input type="number" value={varSvc} onChange={e => setVarSvc(e.target.value)} step="0.1" min="0" style={input} />
            </div>
          )}
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
          { label: 'Ca² (Arrival SCV)', value: result.Ca2.toFixed(3) },
          { label: 'Cs² (Service SCV)', value: result.Cs2.toFixed(3) },
        ]} />
      )}
      <div style={{ marginTop: 24, ...panel, boxShadow: 'none', border: '2px solid #000' }}>
        <h4 style={{ color: COLORS.ink, marginBottom: 10, fontWeight: 800 }}>G/G/1 (Kingman's Approximation)</h4>
        <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>Lq = [ρ²(1+Cs²)(Ca²+ρ²Cs²)] / [2(1-ρ)(1+ρ²Cs²)]</p>
      </div>
    </ModelLayout>
  );
}
