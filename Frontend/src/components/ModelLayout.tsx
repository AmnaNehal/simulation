import { ReactNode } from 'react';
import { Route } from '../App';
import { page, badge, button, press, COLORS } from '../theme';

interface Props {
  title: string;
  subtitle: string;
  badge: string;
  navigate: (r: Route) => void;
  back: Route;
  accentColor?: string;
  children: ReactNode;
}

export default function ModelLayout({ title, subtitle, badge: badgeText, navigate, back, accentColor = COLORS.yellow, children }: Props) {
  return (
    <div style={page}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={badge(accentColor)}>{badgeText}</span>
          <h1 style={{ color: COLORS.ink, fontSize: '2rem', fontWeight: 900, margin: '14px 0 6px' }}>{title}</h1>
          <p style={{ color: COLORS.sub, fontSize: '0.95rem', fontWeight: 600 }}>{subtitle}</p>
        </div>

        {children}

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button
            onClick={() => navigate(back)}
            style={button(COLORS.surface)}
            onMouseDown={e => press(e, true)}
            onMouseUp={e => press(e, false)}
            onMouseLeave={e => press(e, false)}
          >← Back</button>
        </div>
      </div>
    </div>
  );
}
