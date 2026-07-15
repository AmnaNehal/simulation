import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import { panel, input, label as lbl, button, press, errorBox, COLORS, infoBox } from '../../theme';

interface Props { navigate: (r: Route) => void; }

export default function MM1Page({ navigate }: Props) {
  const [arrivalRate, setArrivalRate] = useState('0.1');
  const [serviceRate, setServiceRate] = useState('0.125');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    const lambda = parseFloat(arrivalRate);
    const mu = parseFloat(serviceRate);
    if (isNaN(lambda) || isNaN(mu) || lambda <= 0 || mu <= 0) { setError('Enter valid positive numbers.'); setResult(null); return; }
    const rho = lambda / mu;
    if (rho >= 1) { setError('ρ ≥ 1: System is unstable (overloaded).'); setResult(null); return; }
    const Ls = rho / (1 - rho);
    const Ws = 1 / (mu - lambda);
    const Lq = rho * rho / (1 - rho);
    const Wq = rho / (mu - lambda);
    setResult({ rho, Ls, Ws, Lq, Wq, idle: 1 - rho });
    setError('');
  };

  return (
    <ModelLayout title="M/M/1 Queue Model" subtitle="Single server with Poisson arrivals and exponential service" badge="M/M/1 Calculator" navigate={navigate} back="queue" accentColor={COLORS.green}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Input Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
          {[
            ['Interarrival Distribution', 'Exponential (fixed)', null, null],
            ['Arrival Rate (λ)', arrivalRate, setArrivalRate, '0.001'],
            ['Service Distribution', 'Exponential (fixed)', null, null],
            ['Service Rate (μ)', serviceRate, setServiceRate, '0.001'],
          ].map(([l, val, setter, step]: any) => (
            <div key={l as string}>
              <label style={lbl}>{l}</label>
              {setter ? (
                <input type="number" value={val} onChange={e => setter(e.target.value)} step={step} min={step} style={input} />
              ) : (
                <div style={infoBox(COLORS.mute)}>{val}</div>
              )}
            </div>
          ))}
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={calculate} style={{ ...button(COLORS.green), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Calculate</button>
          <button onClick={() => { setArrivalRate('0.1'); setServiceRate('0.125'); setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>

      {result && (
        <ResultCard accentColor={COLORS.green} metrics={[
          { label: 'Customers in System (Ls)', value: result.Ls.toFixed(3) },
          { label: 'Time in System (Ws)', value: result.Ws.toFixed(3) },
          { label: 'Response Time (R)', value: result.Ws.toFixed(3) },
          { label: 'Customers in Queue (Lq)', value: result.Lq.toFixed(3) },
          { label: 'Time in Queue (Wq)', value: result.Wq.toFixed(3) },
          { label: 'Server Utilization (ρ)', value: `${(result.rho * 100).toFixed(1)}%` },
          { label: 'Server Idle Time', value: `${(result.idle * 100).toFixed(1)}%` },
        ]} />
      )}

      <div style={{ marginTop: 24, ...panel, boxShadow: 'none', border: '2px solid #000' }}>
        <h4 style={{ color: COLORS.ink, marginBottom: 10, fontWeight: 800 }}>M/M/1 Formulas</h4>
        <p style={{ color: COLORS.sub, fontSize: 13, fontWeight: 600 }}>ρ = λ/μ &nbsp;|&nbsp; Ls = ρ/(1−ρ) &nbsp;|&nbsp; Ws = 1/(μ−λ) &nbsp;|&nbsp; Lq = ρ²/(1−ρ) &nbsp;|&nbsp; Wq = ρ/(μ−λ)</p>
        <p style={{ color: COLORS.sub, fontSize: 12, marginTop: 6 }}>Where: λ = arrival rate (customers/unit time), μ = service rate (customers/unit time per server). Response Time = time in system (Ws).</p>
      </div>
    </ModelLayout>
  );
}
