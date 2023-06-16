import React from 'react';
import { IRequestConfig } from 'domain/repositories/user';

const useQuery = (fn: (options?: IRequestConfig) => Promise<void>, options?: IRequestConfig) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await fn({ ...options, signal: abortController.signal });
        console.log('reee');
      } catch (err) {
        const error = err as Error;
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [options]);

  return { error, isLoading };
};

export { useQuery };
