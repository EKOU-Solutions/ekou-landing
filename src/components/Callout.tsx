import type { ReactNode } from 'react';

interface CalloutProps {
  title: string;
  children: ReactNode;
}

export function Callout({ title, children }: CalloutProps) {
  return (
    <div style={{
      border: '1px solid rgba(133, 247, 254, 0.25)',
      background: 'rgba(124, 222, 255, 0.08)',
      padding: '14px 16px',
      borderRadius: '12px',
      color: '#e8f3ff'
    }}>
      <strong style={{ color: '#85f7fe' }}>{title}</strong>
      <div style={{ marginTop: '6px' }}>{children}</div>
    </div>
  );
}
