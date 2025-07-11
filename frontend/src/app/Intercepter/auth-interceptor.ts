import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthorizationService } from "../services/auth.service";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthorizationService);
  const token = authService.getToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};