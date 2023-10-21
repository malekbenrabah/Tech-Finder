import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptorService } from './services/interceptor/token-interceptor.service';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { FilterPipe } from './pipes/filter.pipe';
import { AdminModule } from './admin/admin.module';
import { KeycloakService , KeycloakAngularModule } from 'keycloak-angular';

registerLocaleData(en);

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/auth',
        realm: 'test-front',
        clientId: 'fedi',
        
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: true,
        redirectUri:''
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    FormlyNgZorroAntdModule,
    AdminModule,
    KeycloakAngularModule
    
  
  ],
  exports: [FilterPipe],
  providers: [{ provide: NZ_I18N, useValue: en_US },{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
