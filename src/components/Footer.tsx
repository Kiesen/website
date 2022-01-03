import { FC } from 'react';
import { FaCuttlefish } from 'react-icons/fa';

type Props = {
  textContent: string;
  showCurrentYear: boolean;
};

const Footer: FC<Props> = ({ textContent, showCurrentYear }) => {
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className="w-full pt-16 pb-6 text-sm text-center fade-in">
      <p className="text-gray-500 no-underline hover:no-underline">
        &copy; {showCurrentYear ? `${currentYear + ' '}` : ''}
        {textContent}
      </p>
    </footer>
  );
};

export default Footer;
