import { catchError, EMPTY, Observable, take } from 'rxjs';
//https://www.youtube.com/watch?v=5GVKeNhu_e4
//shouldnt this be an interceptor?
export class Perform<T> {
  data: T | undefined;
  isLoading = false;
  hasError = false;
  private action$: Observable<T> | undefined;

  load(action$: Observable<T>): void {
    this.isLoading = true;
    this.hasError = false;
    this.action$ = action$;
    this.action$
      .pipe(
        take(1),
        catchError(() => {
          this.data = undefined;
          this.isLoading = false;
          this.hasError = true;
          return EMPTY;
        })
      )
      .subscribe((data: T) => {
        this.data = data;
        this.isLoading = false;
        this.hasError = false;
      });
  }
}