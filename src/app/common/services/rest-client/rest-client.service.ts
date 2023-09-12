import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject, throwError } from 'rxjs';
import { takeUntil, delay, map, tap, catchError } from 'rxjs/operators';

import { RestServiceConfig, TypeTokenStorage } from './rest-client.config';

export declare type HttpObserve = 'body' | 'events' | 'response';

export declare interface HttpOptions {
    body?: any;
    headers?: HttpHeaders | {
        [ header: string ]: string | string[];
    };
    params?: HttpParams | {
        [ param: string ]: string | string[];
    };
    observe?: HttpObserve;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class RestClientService {

    /**
     * Handler used to stop all pending requests
     */
    protected cancelPending$: Subject<boolean> = new Subject<boolean>();

    /**
     * Default requests header
     */
    protected baseHeader: any = {
        accept:             'application/json',
        'Cache-Control':    'no-cache',
        Pragma:             'no-cache',
        'Accept-Language':  '*',
        Authorization:      ''
    };

    /**
     * Service configuration parameters
     */
    protected config: RestServiceConfig;

    /**
     * When true, the request header will include the authentication token
     */
    protected secureRequest = false;

    /**
     * Holds a list of files to be upload on request
     */
    protected isWithFiles = false;

    /**
     * Service class constructor
     */
    constructor(
        private http: HttpClient,
        private readonly router: Router,
        @Optional() config: RestServiceConfig
    ) {
        this.config = {
            endPoint: '',
            tokenName: 'AuthToken',
            tokenStorage: TypeTokenStorage.sessionStorage,
            mockData: false,
            validationTokenUri: '/validate-token',
            authUri: '/authorize',
            UnauthorizedRedirectUri: null
        };
        if ( config ) { this.config = { ...this.config, ...config }; }
    }

    /**
     * Set the Rest Client configuration parameters.
     *
     * CAUTION: This method override the current configuration settings
     * and this settings will apply to all following requests
     */
    public setConfig( config: RestServiceConfig ): RestClientService
    {
        this.config = { ...this.config, ...config };
        return this;
    }

    /**
     * Return the current Rest Client configuration parameters.
     */
    public getConfig(  ): RestServiceConfig
    {
        return this.config;
    }

    /**
     * Get the API Token from cookies
     */
    public getToken(): string
    {
        let token: string | null = '';

        if ( this.config.tokenName ) {
            switch ( this.config.tokenStorage ) {
                case TypeTokenStorage.localStorage:
                    token = localStorage.getItem(this.config.tokenName);
                    break;
                case TypeTokenStorage.sessionStorage:
                    token = sessionStorage.getItem(this.config.tokenName);
                    break;
                default:
                    throw new Error('Invalid Token Storage method');
            }
        }

        return !token || typeof token === 'undefined' ? '' : token;
    }

    /**
     * Request an Authorization token
     *
     * The default authorization URI is '[API_END_POINT]/authorize'
     */
    public authorize( UserName: string, Password: string ): Observable<any>
    {
        if ( this.config.authUri ) {
            return this
                .request('post', this.config.authUri, { username: UserName, password: Password })
                    .pipe(tap((payload) => { this.setToken(payload.token); }));
        } else {
            throw new Error('Missing authUri');
        }
    }

    /**
     * Validate the Authentication token against the API
     */
    public validateToken(): Observable<any>
    {
        if ( this.config.validationTokenUri ) {
            return this.request('post', this.config.validationTokenUri);
        } else {
            throw new Error('Missing validationTokenUri');
        }

    }

    /**
     * Remove the Authentication token cookie
     */
    public revoke(): void
    {
        if ( this.config.tokenName ) {
            switch ( this.config.tokenStorage ) {
                case TypeTokenStorage.localStorage:
                    localStorage.removeItem(this.config.tokenName);
                    break;
                case TypeTokenStorage.sessionStorage:
                    sessionStorage.removeItem(this.config.tokenName);
                    break;
                default:
                    throw new Error('Invalid Token Storage method');
            }
        }
    }

    /**
     * Check if the client is already Authenticate
     */
    public isAuthorized(): boolean
    {
        return this.getToken() !== '';
    }

    /**
     * Cancel all pending requests
     */
    public cancelPendingRequests(): void
    {
        this.cancelPending$.next(true);
    }

    /**
     * API request using GET method
     */
    public get(url: string, data?: {}): Observable<any>
    {
        return this.request('get', url, data);
    }

    /**
     * API request using POST method
     */
    public post( url: string, data?: {}, responseType?: string, httpOptions: HttpOptions = {} ): Observable<any>
    {
        return this.request('post', url, data, responseType, httpOptions);
    }

    /**
     * API request using PUT method
     */
    public put( url: string, data?: {}, responseType?: string, httpOptions: HttpOptions = {} ): Observable<any>
    {
        return this.request('put', url, data, responseType, httpOptions);
    }

    /**
     * Set the upload file mode
     */
    public withFiles( ): RestClientService
    {
        this.isWithFiles = true;
        return this;
    }

    /**
     * API request using DELETE method
     */
    public delete(url: string, data?: {}, responseType?: string): Observable<any>
    {
        return this.request('delete', url, data, responseType);
    }

    /**
     * Set the request mode to SECURED for the next request.
     *
     * Secured Mode force the next request to include the authentication token.
     * The token must be requested previously using the "authorize" method.
     */
    public secured(): RestClientService
    {
        this.secureRequest = true;
        return this;
    }

    /**
     * Set the request mode to PUBLIC for the next request.
     *
     * Public is the default request mode and ensure that no authentication token
     * will be pass on the next request.
     */
    public public(): RestClientService
    {
        this.secureRequest = false;
        return this;
    }

    /**
     * Return the request headers based on configuration parameters
     */
    private buildHeaders(): any
    {
        const header =  { ...this.baseHeader };

        if ( this.config.language ) { header['Accept-Language'] = this.config.language; }

        if ( this.secureRequest ) {
            const token = this.getToken();
            if ( !token ) {
                console.warn(
                    'Executing a secure request without TOKEN. '
                    + 'Authorization header will not be set!'
                );
            } else { header.Authorization = `Bearer ${token}`; }
            this.secureRequest = false;
        }

        return header;
    }

    /**
     * Save the API Token
     */
    public setToken( token: string ): void
    {
        if ( this.config.tokenName ) {
            switch ( this.config.tokenStorage ) {
                case TypeTokenStorage.localStorage:
                    localStorage.setItem(this.config.tokenName, token);
                    break;
                case TypeTokenStorage.sessionStorage:
                    sessionStorage.setItem(this.config.tokenName, token);
                    break;
                default:
                    throw new Error('Invalid Token Storage method');
            }
        }
    }

    /**
     * Build a valid URL concatenating the url parameter with the ApiEndPoint
     */
    protected buildUrl( url: string ): string
    {
        let nUrl = this.config.endPoint.replace(/\/$/, '')+'/'+url.replace(/^\/+/, '');

        const match = nUrl.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);

        if ( this.config.mockData && match == null ) {
            nUrl = `${nUrl}.json`;
        }

        return nUrl;
    }

    /**
     * Create a FormData object to be send as request payload data
     */
    protected createFormData(object: any, form?: FormData, namespace?: string): FormData
    {
        const formData = form || new FormData();

        for (const property in object) {

            if (!object.hasOwnProperty(property) || !object[property]) { continue; }

            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if ( object[property] instanceof FileList ) {
                for (let i = 0; i < object[property].length; i++) {
                    formData.append(`${property}[]`, object[property].item(i));
                }
            } else if (
                typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }

    /**
     * Raw request method
     */

    protected request( method: string, url: string, data?: any, responseType?: string, httpOptions: HttpOptions = {} ): Observable<any>
    {
        const msDelay = Math.floor((Math.random() * 2000) + 1000);
        const header = this.buildHeaders();

        const rType = (responseType ? responseType : 'json' ) as 'text';

        if ( this.isWithFiles ) { data = this.createFormData( data ); this.isWithFiles = false; }

        const options = {
            body: method.toLowerCase() === 'get' ? {} : data,
            responseType: rType,
            params: method.toLowerCase() === 'get' ? data : {},
            headers: header
        };

        return this.http
            .request(
                this.config.mockData ? 'get' : method, this.buildUrl(url),
                { ...options, ...httpOptions }
            )
                .pipe(takeUntil(this.cancelPending$))
                    .pipe(delay( this.config.mockData ? msDelay : 0 ))
                        .pipe(catchError((err) => {
                            if ( this.config.UnauthorizedRedirectUri && url !== this.config.authUri && err.status === 401 ) {
                                this.router.navigate( [ this.config.UnauthorizedRedirectUri ] ).then(() => {});
                                this.cancelPendingRequests();
                            }
                            return throwError(err);
                        }));
    }
}
