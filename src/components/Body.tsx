import { FC } from 'react';

const Body: FC = ({ children }) => (
  <body
    style={{ backgroundImage: "url('/images/background.png')" }}
    className={`leading-normal tracking-normal text-gray-100 m-6 bg-cover bg-fixed`}
  >
    <div className="h-full">{children}</div>
  </body>
);

export default Body;
