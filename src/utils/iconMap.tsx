import {
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGit,
} from 'react-icons/si';

const iconSize = '35px';

const iconMap = new Map([
  ['typescript', <SiTypescript key="typescript" size={iconSize} />],
  ['reactjs', <SiReact key="reactjs" size={iconSize} />],
  ['nodejs', <SiNodedotjs key="nodejs" size={iconSize} />],
  ['python', <SiPython key="python" size={iconSize} />],
  ['postgresql', <SiPostgresql key="postgresql" size={iconSize} />],
  ['mongodb', <SiMongodb key="mongodb" size={iconSize} />],
  ['docker', <SiDocker key="docker" size={iconSize} />],
  ['kubernetes', <SiKubernetes key="kubernetes" size={iconSize} />],
  ['git', <SiGit key="git" size={iconSize} />],
]);

export default iconMap;
