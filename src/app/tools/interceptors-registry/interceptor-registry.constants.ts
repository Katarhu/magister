import { httpErrorInterceptor } from 'src/app/interceptors/http-error.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => ([
    httpErrorInterceptor
  ]);
}
