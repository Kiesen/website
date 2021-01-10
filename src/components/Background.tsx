import { FC } from 'react';

type BackgroundProps = {
  name: string;
};

/**
 * -- TODO --
 * Currently it is not possible to set the background image over the tailwindcss
 * class. Therefore I introduced this temporary workaround. After some research
 * this should be replaced with the initial implementation.
 *
 */
const Background: FC<BackgroundProps> = ({ children, name }) => (
  <div
    className={`bg-${name} bg-no-repeat bg-cover bg-fixed bg-center`}
    style={{ backgroundImage: "url('/images/retro.gif')" }}
  >
    {children}
  </div>
);

export default Background;
