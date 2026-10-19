import React from 'react';

type Props = {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function ConfirmModal({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        background: 'rgb(0 0 0 / 45%)',
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        style={{ maxWidth: 420, padding: 20, background: 'Canvas', color: 'CanvasText' }}
      >
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        {onCancel && (
          <>
            <button onClick={onCancel}>Hủy</button>
            {' '}
          </>
        )}
        <button onClick={onConfirm}>{confirmText}</button>
      </section>
    </div>
  );
}
