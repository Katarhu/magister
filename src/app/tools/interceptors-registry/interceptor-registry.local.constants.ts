import { authMockInterceptor } from 'src/mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from 'src/app/interceptors/http-error.interceptor';
import { userMockInterceptor } from 'src/mocks/user-mock-interceptor/user-mock.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    // LOCAL INTERCEPTORS
    authMockInterceptor,
    userMockInterceptor,
  ];
}
