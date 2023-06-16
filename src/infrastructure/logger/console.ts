interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

class Logger implements ILogger {
  public log(message: string): void {
    console.log(`${new Date().toLocaleTimeString()} [LOG]: ${message}`);
  }

  public error(message: string): void {
    console.error(`${new Date().toLocaleTimeString()} [ERROR]: ${message}`);
  }
}

export { Logger };
export type { ILogger };
