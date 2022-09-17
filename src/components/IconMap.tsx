import {
  SiDocker,
  SiElixir,
  SiGit,
  SiKubernetes,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from 'react-icons/si';

const IconMap = new Map([
  ['typescript', (size: number) => <SiTypescript size={size} />],
  ['postgresql', (size: number) => <SiPostgresql size={size} />],
  ['kubernetes', (size: number) => <SiKubernetes size={size} />],
  ['nodejs', (size: number) => <SiNodedotjs size={size} />],
  ['reactjs', (size: number) => <SiReact size={size} />],
  ['python', (size: number) => <SiPython size={size} />],
  ['elixir', (size: number) => <SiElixir size={size} />],
  ['docker', (size: number) => <SiDocker size={size} />],
  ['git', (size: number) => <SiGit size={size} />],
]);

export default IconMap;
