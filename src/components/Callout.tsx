import type { ReactNode } from 'react';

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid rgba(123,242,255,0.3)',
        background: 'rgba(255,255,255,0.04)',
        color: '#dce7ff'
      }}
    >
      <strong style={{ display: 'block', marginBottom: '8px', color: '#80f7ff' }}>{title}</strong>
      <div style={{ lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export default Callout;
