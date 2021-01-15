import { FC } from 'react';

type BackgroundProps = {
  name: string;
};

/**
 * -- TODO --
 * Currently it is not possible to set the background image over the tailwindcss
 * class. Therefore I introduced this temporary workaround. After some research
 * this should be replaced with the initial implementation.
 * // style={{ backgroundImage: "url('/images/retro.gif')" }}
 */
const Background: FC<BackgroundProps> = ({ children }) => (
  <div
    className={`bg-green-900 bg-no-repeat bg-cover bg-fixed bg-center`}
  >
    {children}
  </div>
);

export default Background;
