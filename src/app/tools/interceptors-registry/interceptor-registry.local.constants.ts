import { authMockInterceptor } from 'src/mocks/auth-mock-interceptor/auth-mock.interceptor';

export namespace InterceptorRegistry {
  export const getInterceptors = () => [authMockInterceptor];
}
