import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`m-2 p-2 rounded-md bg-gray-50 bg-opacity-10 ${className}`}
    >
      {children}
    </div>
  );
}
