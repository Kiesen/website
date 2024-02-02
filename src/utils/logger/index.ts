import chalk from 'chalk';

const log = console.log;
const error = console.error;

const logger = (ns: string) => ({
  stdout: (message: string, ...optionalParams: any[]) => {
    optionalParams
      ? log(chalk.bold(`[ok]:${ns}: ${message}`), optionalParams)
      : log(chalk.bold(`[ok]:${ns}: ${message}`));
  },
  stderr: (message: string, optionalParams?: any) => {
    optionalParams
      ? error(
          chalk.red.bold(`[err]:${ns}: ${message}`),
          optionalParams
        )
      : error(chalk.red.bold(`[err]:${ns}: ${message}`));
  },
});

export default logger;
