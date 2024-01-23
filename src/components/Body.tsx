import { ReactNode } from 'react';

type BodyProps = {
  children: ReactNode;
};

export function Body({ children }: BodyProps) {
  return (
    <body
      style={{ backgroundImage: "url('/images/background.png')" }}
      className={`leading-normal tracking-normal text-gray-100 bg-cover bg-fixed h-full`}
    >
      {children}
    </body>
  );
}
