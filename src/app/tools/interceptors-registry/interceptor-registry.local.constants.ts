import { authMockInterceptor } from '@/mocks/auth-mock-interceptor/auth-mock.interceptor';
import { httpErrorInterceptor } from '@/app/interceptors/http-error.interceptor';
import { userMockInterceptor } from '@/mocks/user-mock-interceptor/user-mock.interceptor';
import { analysisMockInterceptor } from '@/mocks/analysis-mock-interceptor/analysis-mock.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [
    httpErrorInterceptor,
    // LOCAL INTERCEPTORS
    authMockInterceptor,
    userMockInterceptor,
    analysisMockInterceptor,
  ];
}
