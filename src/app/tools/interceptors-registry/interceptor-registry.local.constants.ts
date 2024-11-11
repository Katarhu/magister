import { authMockInterceptor } from '@/mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from '@/app/interceptors/http-error.interceptor';
import { userMockInterceptor } from '@/mocks/user-mock-interceptor/user-mock.interceptor';
import { analysesMockInterceptor } from '@mocks/analyses-mock-interceptor/analyses-mock.interceptor';
import { tokenAuthInterceptor } from '@interceptors/auth-token.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    tokenAuthInterceptor,
    // LOCAL INTERCEPTORS
    authMockInterceptor,
    userMockInterceptor,
    analysesMockInterceptor,
  ];
}
