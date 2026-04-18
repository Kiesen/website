type Level = 'INFO' | 'WARN' | 'ERROR'

export interface LoggerOptions {
  /** Include an ISO timestamp prefix. Defaults to true. */
  timestamp?: boolean
}

export interface Logger {
  info(message: string): void
  warn(message: string): void
  error(message: string): void
}

function format(level: Level, namespace: string, message: string, timestamp: boolean): string {
  const prefix = timestamp ? `${new Date().toISOString()} ` : ''
  return `${prefix}[${level}] [${namespace}] ${message}`
}

/**
 * Returns a namespaced logger. info → stdout, warn/error → stderr.
 *
 * Usage:
 *   const log = createLogger('spotify:token')
 *   log.info('cache hit')
 *   log.error('refresh failed: 401')
 */
export function createLogger(namespace: string, options: LoggerOptions = {}): Logger {
  const timestamp = options.timestamp ?? true

  return {
    info: (message) => process.stdout.write(format('INFO', namespace, message, timestamp) + '\n'),
    warn: (message) => process.stderr.write(format('WARN', namespace, message, timestamp) + '\n'),
    error: (message) => process.stderr.write(format('ERROR', namespace, message, timestamp) + '\n'),
  }
}
