import { HttpInterceptorFn } from '@angular/common/http';

export const performInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
