export enum TypeTokenStorage {
    localStorage = 'localStorage',
    sessionStorage = 'sessionStorage',
}

export class RestServiceConfig {
    public endPoint: string = '';
    public mockData?: boolean = false;
    public tokenStorage?: TypeTokenStorage | undefined | null;
    public tokenName?: string | undefined | null;
    public language?: string | undefined | null;
    public authUri?: string | undefined | null;
    public validationTokenUri?: string;
    public UnauthorizedRedirectUri?: string | undefined | null;
}
