import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, select, label as lbl, button, press, errorBox, COLORS, infoBox } from '../../theme';

interface Props { navigate: (r: Route) => void; }

export default function MG1Page({ navigate }: Props) {
  const [arrivalRate, setArrivalRate] = useState('3.3333');
  const [svcDist, setSvcDist] = useState('normal');
  const [serviceRate, setServiceRate] = useState('4');
  const [varSvc, setVarSvc] = useState('0.0625');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const lambda = parseFloat(arrivalRate);
    const mu = parseFloat(serviceRate);
    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) { setError('Enter valid values.'); return; }
    const rho = lambda / mu;
    if (rho >= 1) { setError('ρ ≥ 1: System unstable.'); setResult(null); return; }
    const sigma2 = parseFloat(varSvc);
    const Cs2 = sigma2 / Math.pow(1 / mu, 2);
    const Lq = (Math.pow(lambda, 2) * sigma2 + Math.pow(rho, 2)) / (2 * (1 - rho));
    const Wq = Lq / lambda;
    const Ws = Wq + 1 / mu;
    const Ls = lambda * Ws;
    setResult({ rho, Lq, Wq, Ws, Ls, Cs2, idle: 1 - rho });
    setError('');
  };

  return (
    <ModelLayout title="M/G/1 Queue Model" subtitle="Poisson arrivals with general service time (P-K Formula)" badge="M/G/1 Calculator" navigate={navigate} back="queue" accentColor={COLORS.blue}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          <div>
            <label style={lbl}>Arrival Distribution</label>
            <div style={infoBox(COLORS.mute)}>Exponential (Poisson)</div>
          </div>
          <div>
            <label style={lbl}>Arrival Rate (λ)</label>
            <input type="number" value={arrivalRate} onChange={e => setArrivalRate(e.target.value)} step="0.001" min="0.001" style={input} />
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
            <label style={lbl}>Service Rate (μ)</label>
            <input type="number" value={serviceRate} onChange={e => setServiceRate(e.target.value)} step="0.001" min="0.001" style={input} />
          </div>
          <div>
            <label style={lbl}>Variance Service Time</label>
            <input type="number" value={varSvc} onChange={e => setVarSvc(e.target.value)} step="0.01" min="0" style={input} />
          </div>
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={calculate} style={{ ...button(COLORS.blue), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Calculate</button>
          <button onClick={() => { setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>

      {result && (
        <ResultCard accentColor={COLORS.blue} metrics={[
          { label: 'Customers in System (L)', value: result.Ls.toFixed(3) },
          { label: 'Time in System (W)', value: result.Ws.toFixed(3) },
          { label: 'Response Time (R)', value: result.Ws.toFixed(3) },
          { label: 'Customers in Queue (Lq)', value: result.Lq.toFixed(3) },
          { label: 'Time in Queue (Wq)', value: result.Wq.toFixed(3) },
          { label: 'Utilization (ρ)', value: `${(result.rho * 100).toFixed(1)}%` },
          { label: 'Idle Time', value: `${(result.idle * 100).toFixed(1)}%` },
          { label: 'Cₛ² (SCV)', value: result.Cs2.toFixed(3) },
        ]} />
      )}
      <div style={{ marginTop: 24, ...panel, boxShadow: 'none', border: '2px solid #000' }}>
        <h4 style={{ color: COLORS.ink, marginBottom: 10, fontWeight: 800 }}>M/G/1 (Pollaczek-Khinchine)</h4>
        <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>Lq = (λ²σ² + ρ²) / (2(1−ρ)) &nbsp;|&nbsp; Wq = Lq/λ &nbsp;|&nbsp; W = Wq + 1/μ &nbsp;|&nbsp; L = λW</p>
      </div>
    </ModelLayout>
  );
}
