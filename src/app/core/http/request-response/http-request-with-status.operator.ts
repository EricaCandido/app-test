import { Observable, catchError, forkJoin, map, merge, of } from 'rxjs';

export type HttpRequestWithStatusResponse<T> = {
  status: 'pending' | 'fulfilled' | 'error';
  error: any;
  data: T;
};

export function httpRequestWithStatus<T>(source: Observable<T>): Observable<HttpRequestWithStatusResponse<T>> {
  return merge(
    of({ status: 'pending' } as HttpRequestWithStatusResponse<T>),
    forkJoin({ request: source }).pipe(
      map(({ request: data }) => ({ status: 'fulfilled', data }) as HttpRequestWithStatusResponse<T>),
      catchError(e => of({ status: 'error', error: e as string } as HttpRequestWithStatusResponse<T>))
    )
  );
}
