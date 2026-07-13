import { useState } from 'react';
import { Route } from '../../App';
import ModelLayout from '../../components/ModelLayout';
import ResultCard from '../../components/ResultCard';
import ServiceDistFields from '../../components/ServiceDistFields';
import { useServiceDist } from '../../hooks/useServiceDist';
import { runSimulation } from './SimEngine';
import { panel, input, label as lbl, button, press, errorBox, COLORS, infoBox, tableWrap, th, td } from '../../theme';

interface Props { navigate: (r: Route) => void; }

export default function MGSSimPage({ navigate }: Props) {
  const [servers, setServers] = useState('2');
  const [meanIA, setMeanIA] = useState('2');
  const svcState = useServiceDist('normal');
  const [meanSvc, setMeanSvc] = useState('1.5');
  const [numCust, setNumCust] = useState('200');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [showTable, setShowTable] = useState(false);

  const simulate = () => {
    const S = parseInt(servers), ia = parseFloat(meanIA), svc = parseFloat(meanSvc), n = parseInt(numCust);
    if (isNaN(S) || S < 1 || isNaN(ia) || ia <= 0 || isNaN(svc) || svc <= 0 || isNaN(n) || n < 1) {
      setError('Please enter valid positive values.'); return;
    }
    if (n > 10000) { setError('Max 10,000 customers allowed.'); return; }
    try {
      const res = runSimulation({ servers: S, arrivalRate: 1 / ia, serviceRate: 1 / svc, numCustomers: n, serviceDist: svcState.dist, serviceParams: svcState.getParams(svc) });
      setResult(res); setError('');
    } catch { setError('Simulation failed.'); }
  };

  return (
    <ModelLayout title="M/G/S Simulation" subtitle="Poisson arrivals with general service — Uniform, Normal, or Gamma" badge="M/G/S Simulator" navigate={navigate} back="simulation" accentColor={COLORS.blue}>
      <div style={panel}>
        <h2 style={{ color: COLORS.ink, marginBottom: 20, fontWeight: 800 }}>Simulation Parameters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {([['Number of Servers', servers, setServers, '1', '1'], ['Mean Interarrival Time', meanIA, setMeanIA, '0.1', '0.1'], ['Mean Service Time', meanSvc, setMeanSvc, '0.1', '0.1'], ['Number of Customers', numCust, setNumCust, '1', '1']] as any[]).map(([l, val, setter, step, min]: any) => (
            <div key={l}>
              <label style={lbl}>{l}</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} step={step} min={min} style={input} />
            </div>
          ))}
          <ServiceDistFields state={svcState} label="Service Distribution (General)" options={['uniform', 'normal', 'gamma']} />
          <div>
            <label style={lbl}>Arrival (M)</label>
            <div style={infoBox(COLORS.mute)}>Poisson (fixed)</div>
          </div>
        </div>
        {error && <div style={errorBox}>⚠ {error}</div>}
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <button onClick={simulate} style={{ ...button(COLORS.blue), flex: 1 }}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >▶ Run Simulation</button>
          <button onClick={() => { setResult(null); setError(''); }} style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
          >Reset</button>
        </div>
      </div>

      {result && (
        <>
          <ResultCard accentColor={COLORS.blue} metrics={[
            { label: 'Avg Wait Time (Wq)', value: result.avgWaitTime.toFixed(4) },
            { label: 'Avg System Time (W)', value: result.avgSystemTime.toFixed(4) },
            { label: 'Avg Response Time (R)', value: result.avgResponseTime.toFixed(4) },
            { label: 'Avg Queue Length (Lq)', value: result.avgQueueLength.toFixed(4) },
            { label: 'Avg System Length (L)', value: result.avgSystemLength.toFixed(4) },
            { label: 'Server Utilization', value: `${(result.serverUtilization * 100).toFixed(1)}%` },
            { label: 'Throughput', value: result.throughput.toFixed(4) },
            { label: 'Total Served', value: String(result.totalServed) },
          ]} />
          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <button onClick={() => setShowTable(t => !t)} style={button(COLORS.blue)}
              onMouseDown={e => press(e, true)} onMouseUp={e => press(e, false)} onMouseLeave={e => press(e, false)}
            >{showTable ? '▲ Hide' : '▼ Show'} Simulation Table (first 20)</button>
          </div>
          {showTable && (
            <div style={tableWrap}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>{['#', 'Server', 'Arrival', 'Svc Start', 'Svc Time', 'Departure', 'Wait', 'System', 'Response'].map(h => (
                    <th key={h} style={th}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {result.table.slice(0, 20).map((row: any) => (
                    <tr key={row.customer}>
                      {[row.customer, row.server, row.arrivalTime.toFixed(4), row.serviceStartTime.toFixed(4), row.serviceTime.toFixed(4), row.departureTime.toFixed(4), row.waitTime.toFixed(4), row.systemTime.toFixed(4), row.responseTime.toFixed(4)].map((v, i) => (
                        <td key={i} style={td}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </ModelLayout>
  );
}
