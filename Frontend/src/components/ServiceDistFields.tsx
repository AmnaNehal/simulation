import { input, select, label as lbl } from '../theme';
import { ServiceDistState } from '../hooks/useServiceDist';
import { ServiceDist } from '../pages/simulate/SimEngine';

const ALL_OPTIONS: { value: ServiceDist; text: string }[] = [
  { value: 'exponential', text: 'Exponential' },
  { value: 'poisson', text: 'Poisson' },
  { value: 'uniform', text: 'Uniform' },
  { value: 'normal', text: 'Normal' },
  { value: 'gamma', text: 'Gamma' },
];

interface Props {
  state: ServiceDistState;
  label?: string;
  options?: ServiceDist[];
}

export default function ServiceDistFields({ state, label: fieldLabel = 'Service Distribution', options }: Props) {
  const { dist, setDist } = state;
  const shown = options ? ALL_OPTIONS.filter(o => options.includes(o.value)) : ALL_OPTIONS;
  return (
    <>
      <div>
        <label style={lbl}>{fieldLabel}</label>
        <select value={dist} onChange={e => setDist(e.target.value as any)} style={select}>
          {shown.map(o => <option key={o.value} value={o.value}>{o.text}</option>)}
        </select>
      </div>
      {dist === 'uniform' && (
        <>
          <div>
            <label style={lbl}>Uniform Min (optional)</label>
            <input type="number" value={state.uniformMin} onChange={e => state.setUniformMin(e.target.value)} step="0.1" placeholder="auto: 0.5 × mean" style={input} />
          </div>
          <div>
            <label style={lbl}>Uniform Max (optional)</label>
            <input type="number" value={state.uniformMax} onChange={e => state.setUniformMax(e.target.value)} step="0.1" placeholder="auto: 1.5 × mean" style={input} />
          </div>
        </>
      )}
      {dist === 'normal' && (
        <div>
          <label style={lbl}>Normal Std Dev (optional)</label>
          <input type="number" value={state.normalStd} onChange={e => state.setNormalStd(e.target.value)} step="0.1" min="0" placeholder="auto: 0.3 × mean" style={input} />
        </div>
      )}
      {dist === 'gamma' && (
        <div>
          <label style={lbl}>Gamma Shape (k)</label>
          <input type="number" value={state.gammaShape} onChange={e => state.setGammaShape(e.target.value)} step="0.1" min="0.1" style={input} />
        </div>
      )}
    </>
  );
}
