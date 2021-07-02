import { NgxsModule} from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import { AccountState } from './store/states/account.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from './modules/account/account.module';
import { EditionModule } from './modules/edition/edition.module';
import { UserModule } from './modules/user/user.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './shared/interceptors/token.interceptor';
import { EditionState } from './store/states/edition.state';
import { JwPaginationModule } from 'jw-angular-pagination';
import { OrderState } from './store/states/order.state';
import { OrderModule } from './modules/order/order.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    NgxsModule.forRoot([AccountState,EditionState,OrderState]),
    NgxsStoragePluginModule.forRoot({
      key:[AccountState, EditionState, OrderState],
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxPaginationModule,
    AccountModule,
    FormsModule,
    EditionModule,
    MatMenuModule,
    MatPaginatorModule,
    UserModule,
    OrderModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    JwPaginationModule,
   
  ],
  exports: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi : true,
      useClass: TokenInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi : true,
      useClass: AuthInterceptor
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   multi : true,
    //   useClass: ErrorsInterceptor
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
