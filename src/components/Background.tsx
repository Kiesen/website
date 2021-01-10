import { FC } from 'react';

type BackgroundProps = {
  name: string;
};

const Background: FC<BackgroundProps> = ({ children, name }) => (
  <div
    className={`bg-${name} bg-no-repeat bg-cover bg-fixed bg-center`}
  >
    {children}
  </div>
);

export default Background;
