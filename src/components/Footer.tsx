import { FC, useEffect, useState } from 'react';

import getTimeString from '@src/utils/getTimeString';

const Footer: FC<{}> = () => {
  const [time, setTime] = useState(getTimeString());

  useEffect(() => {
    setTimeout(() => {
      setTime(getTimeString());
    }, 1000);
  }, [time]);

  return (
    <footer className="w-full p-4 text-center text-xl animate-glitch">
      {time}
    </footer>
  );
};

export default Footer;
