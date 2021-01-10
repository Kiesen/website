import { FC } from 'react';

const Footer: FC<{}> = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="w-full p-4 text-center animate-glitch">
      {date}
    </footer>
  );
};

export default Footer;
