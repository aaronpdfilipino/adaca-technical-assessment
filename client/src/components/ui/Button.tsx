import type { MouseEventHandler, ReactNode } from 'react';

type ButtonProps = {
  onClick: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
};

export default function Button({ onClick, disabled = false, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded px-3 py-1 disabled:opacity-50 ${className ? className : `bg-gray-200`}`}
    >
      {children}
    </button>
  );
}
