import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { RestClientService } from './rest-client.service';
import { RestServiceConfig } from './rest-client.config';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        HttpClient,
        RestClientService,
        RouterModule
    ]
})
export class RestClientModule {
    public static forRoot( config?: RestServiceConfig ): ModuleWithProviders<any> {
        return {
            ngModule: RestClientModule,
            providers: [
                { provide: RestServiceConfig, useValue: config }
            ]
        };
    }
}
