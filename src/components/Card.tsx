import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const Card: FC<Props> = ({ children, className }) => (
  <div
    className={`m-2 p-2 rounded-md bg-gray-50 bg-opacity-10 ${className}`}
  >
    {children}
  </div>
);

export default Card;
