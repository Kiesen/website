import chalk from 'chalk';

const log = console.log;
const error = console.error;

const logger = (ns: string) => ({
  stdout: (message: string, optionalParams?: any) => {
    optionalParams
      ? log(chalk.bold(`${ns}: ${message}`), optionalParams)
      : log(chalk.bold(`${ns}: ${message}`));
  },
  stderr: (message: string, optionalParams?: any) => {
    optionalParams
      ? error(chalk.red.bold(`${ns}: ${message}`), optionalParams)
      : error(chalk.red.bold(`${ns}: ${message}`));
  },
});

export default logger;
