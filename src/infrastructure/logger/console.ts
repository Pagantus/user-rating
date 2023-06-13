interface ILogger {
  log(message: string): void;
  error(message: string): void;
}

class Logger implements ILogger {
  public log(message: string): void {
    console.log(`${new Date().toDateString()} [LOG]: ${message}`);
  }

  public error(message: string): void {
    console.error(`${new Date().toDateString()} [ERROR]: ${message}`);
  }
}

export { Logger };
export type { ILogger };
