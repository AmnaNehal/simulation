// Shared neubrutalist design tokens — black & white base, sharp corners, hard shadows.
import type { CSSProperties } from 'react';

export const COLORS = {
  bg: '#f2f0e9',
  surface: '#ffffff',
  ink: '#000000',
  sub: '#4b4b4b',
  mute: '#e7e4da',
  yellow: '#ffd400',
  pink: '#ff3ea5',
  blue: '#2b6dff',
  green: '#00c853',
  orange: '#ff7a1a',
  red: '#ff3b30',
};

// Per-section accent so pages stay recognizable without gradients/glass.
export const ACCENTS = {
  home: COLORS.yellow,
  queue: COLORS.blue,
  sim: COLORS.pink,
  live: COLORS.orange,
  download: COLORS.green,
};

export const BORDER = `3px solid ${COLORS.ink}`;
export const BORDER_THIN = `2px solid ${COLORS.ink}`;
export const SHADOW = `6px 6px 0px ${COLORS.ink}`;
export const SHADOW_SM = `4px 4px 0px ${COLORS.ink}`;
export const SHADOW_LG = `9px 9px 0px ${COLORS.ink}`;

export const FONT = "'Space Grotesk', 'Segoe UI', system-ui, sans-serif";

export const page: CSSProperties = {
  minHeight: '100vh',
  background: COLORS.bg,
  fontFamily: FONT,
  color: COLORS.ink,
  padding: '40px 20px',
};

export const panel: CSSProperties = {
  background: COLORS.surface,
  border: BORDER,
  boxShadow: SHADOW,
  borderRadius: 0,
  padding: 28,
};

export const panelFlat: CSSProperties = {
  background: COLORS.surface,
  border: BORDER_THIN,
  borderRadius: 0,
};

export function button(bg: string = COLORS.yellow, opts: { big?: boolean } = {}): CSSProperties {
  return {
    background: bg,
    color: COLORS.ink,
    border: BORDER,
    borderRadius: 0,
    boxShadow: SHADOW_SM,
    padding: opts.big ? '16px 32px' : '13px 22px',
    fontWeight: 800,
    fontSize: opts.big ? 16 : 14,
    cursor: 'pointer',
    fontFamily: FONT,
    transition: 'transform 0.08s linear, box-shadow 0.08s linear',
  };
}

export function press(e: React.MouseEvent<HTMLElement>, down: boolean) {
  const el = e.currentTarget;
  if (down) {
    el.style.transform = 'translate(4px, 4px)';
    el.style.boxShadow = '0px 0px 0px #000';
  } else {
    el.style.transform = 'translate(0, 0)';
    el.style.boxShadow = SHADOW_SM;
  }
}

export const input: CSSProperties = {
  width: '100%',
  background: COLORS.surface,
  border: BORDER_THIN,
  borderRadius: 0,
  padding: '12px 14px',
  color: COLORS.ink,
  fontSize: 15,
  fontWeight: 600,
  fontFamily: FONT,
  boxSizing: 'border-box',
};

export const select: CSSProperties = { ...input, cursor: 'pointer' };

export const label: CSSProperties = {
  color: COLORS.ink,
  fontSize: 12,
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: 0.6,
  display: 'block',
  marginBottom: 8,
};

export function badge(bg: string = COLORS.yellow): CSSProperties {
  return {
    display: 'inline-block',
    background: bg,
    color: COLORS.ink,
    border: BORDER_THIN,
    borderRadius: 0,
    padding: '5px 14px',
    fontSize: 12,
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  };
}

export const errorBox: CSSProperties = {
  marginTop: 16,
  padding: '12px 16px',
  background: '#ffe4e1',
  border: BORDER_THIN,
  borderRadius: 0,
  color: '#8a0000',
  fontWeight: 700,
};

export const infoBox = (bg: string): CSSProperties => ({
  background: bg,
  border: BORDER_THIN,
  borderRadius: 0,
  padding: '12px 20px',
  marginBottom: 20,
  color: COLORS.ink,
  fontSize: 13,
  fontWeight: 600,
});

export const tableWrap: CSSProperties = { marginTop: 16, overflowX: 'auto', border: BORDER_THIN };
export const th: CSSProperties = {
  padding: '10px 12px', background: COLORS.ink, color: COLORS.surface,
  textAlign: 'right', fontWeight: 800, fontSize: 12, textTransform: 'uppercase',
};
export const td: CSSProperties = { padding: '8px 12px', color: COLORS.ink, textAlign: 'right', borderBottom: BORDER_THIN, fontSize: 13 };
