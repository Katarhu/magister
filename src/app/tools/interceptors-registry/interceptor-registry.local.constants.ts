import { authMockInterceptor } from 'src/mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    // LOCAL INTERCEPTORS
    authMockInterceptor,
  ];
}
