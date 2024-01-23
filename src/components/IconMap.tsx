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

const iconSize = '35px';

export const IconMap = new Map([
  ['kubernetes', <SiKubernetes key="kubernetes" size={iconSize} />],
  ['typescript', <SiTypescript key="typescript" size={iconSize} />],
  ['postgresql', <SiPostgresql key="postgresql" size={iconSize} />],
  ['nodejs', <SiNodedotjs key="nodejs" size={iconSize} />],
  ['elixir', <SiElixir key="mongodb" size={iconSize} />],
  ['reactjs', <SiReact key="reactjs" size={iconSize} />],
  ['python', <SiPython key="python" size={iconSize} />],
  ['docker', <SiDocker key="docker" size={iconSize} />],
  ['git', <SiGit key="git" size={iconSize} />],
]);
