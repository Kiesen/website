import { FC, useEffect, useState } from 'react';

const Footer: FC<{}> = () => {
  const getClockString = (): string => {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    return `${hours}:${minutes}:${seconds}`;
  };

  const [time, setTime] = useState(getClockString());

  useEffect(() => {
    setTimeout(() => {
      setTime(getClockString());
    }, 1000);
  }, [time]);

  return (
    <footer className="w-full p-4 text-center animate-glitch">
      {time}
    </footer>
  );
};

export default Footer;
