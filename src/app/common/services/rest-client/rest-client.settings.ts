import { RestServiceConfig, TypeTokenStorage } from './rest-client.config';

export const RestClientSettings: RestServiceConfig = {
    endPoint: 'https://desa.ies-webcontent.com.mx',
    mockData: false,
    validationTokenUri: 'authenticate',
    UnauthorizedRedirectUri: '/',
    authUri: 'authenticate',
    tokenName: 'MVP1:token',
    tokenStorage: TypeTokenStorage.sessionStorage
};
