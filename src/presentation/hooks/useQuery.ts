import React from 'react';
import { IRequestConfig } from 'domain/repositories/user';

type UseQuery = {
  fetchFn: (options?: IRequestConfig) => Promise<void>;
  loadMoreFn?: (options?: IRequestConfig) => Promise<void>;
  options?: IRequestConfig;
  canStart?: boolean;
};

const useQuery = ({ fetchFn, loadMoreFn, options, canStart }: UseQuery) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<Error | null>(null);

  const runWithAbort = React.useCallback(
    async (fn: (options?: IRequestConfig) => Promise<void>) => {
      const abortController = new AbortController();
      try {
        setIsLoading(true);
        await fn({ ...options, signal: abortController.signal });
      } catch (err) {
        const error = err as Error;
        setError(error);
      } finally {
        setIsLoading(false);
      }
      return () => abortController.abort();
    },
    [options]
  );

  const fetchData = React.useCallback(() => runWithAbort(fetchFn), [runWithAbort]);

  const loadMore = React.useCallback(() => {
    if (loadMoreFn) {
      runWithAbort(loadMoreFn);
    }
  }, [runWithAbort]);

  const refetch = () => {
    fetchData();
  };

  React.useEffect(() => {
    if (canStart) {
      fetchData();
    }
  }, [fetchData]);

  return { error, isLoading, refetch, loadMore };
};

export { useQuery };
