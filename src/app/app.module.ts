import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './modules/auth/auth.interceptor'; 


//importa los componentes principales 
import { LoginComponent } from './modules/pages/login/login.component'; 
import { DasComponent } from './modules/pages/dashboard/das.component';



//importa los servicios
import { AlertService } from './modules/alerts/alert.service';
import { LoginService } from './modules/auth/login.service';
import { UserService } from './modules/user/user.service';
import { RoleService } from './modules/role/role.service';
import { PetService } from './modules/pet/pet.service';
import { ClientService } from './modules/client/client.service';
import { ClinicHistoryService } from './modules/clinichistory/clinicHistory.service';
import { HistoryDetailService } from './modules/historydetail/historyDetail.service';

//importamos los componentes crud

import { CrudUserComponent } from './modules/user/crud-user/crud-user.component';
import { CrudRolComponent } from './modules/role/crud-rol/crud-rol.component';

import { CrudPetComponent } from './modules/pet/crud-pet/crud-pet.component';
import { CrudClientComponent } from './modules/client/crud-client/crud-client.component';

import { CrudClinicHistoryComponent } from './modules/clinichistory/crud-clinic-history/crud-clinic-history.component';
import { CrudHistoryDetailComponent } from './modules/historydetail/crud-history-detail/crud-history-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DasComponent,
    CrudUserComponent,
    CrudRolComponent,
    CrudPetComponent,
    CrudClientComponent,
    CrudClinicHistoryComponent,
    CrudHistoryDetailComponent
    
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Agrega HttpClientModule aquí
    AppRoutingModule,
  ],
  providers: [ 
    CookieService,
    AlertService,
    LoginService,
    UserService,
    PetService,
    RoleService,
    ClientService,
    ClinicHistoryService,
    HistoryDetailService,
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
