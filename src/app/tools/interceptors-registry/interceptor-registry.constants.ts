import { httpErrorInterceptor } from '@app/interceptors/http-error.interceptor';
import { tokenAuthInterceptor } from '@interceptors/auth-token.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [httpErrorInterceptor, tokenAuthInterceptor];
}
