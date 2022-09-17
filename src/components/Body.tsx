import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Body: FC<Props> = ({ children }) => (
  <body
    style={{ backgroundImage: "url('/images/background.png')" }}
    className={`leading-normal tracking-normal text-gray-100 bg-cover bg-fixed h-full`}
  >
    {children}
  </body>
);

export default Body;
