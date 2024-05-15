import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor'; 


//importa los componentes principales 
import { LoginComponent } from './pages/login/login.component'; 
import { DasComponent } from './pages/dashboard/das.component';



//importa los servicios
import { AlertService } from './services/alert.service';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';
import { PetService } from './services/pet.service';
import { ClientService } from './services/client.service';
import { ClinicHistoryService } from './services/clinicHistory.service';
import { HistoryDetailService } from './services/historyDetail.service';

//importamos los componentes crud

import { CrudUserComponent } from './components/crud/crud-user/crud-user.component';

import { CrudRolComponent } from './components/crud/crud-rol/crud-rol.component';


import { CrudPetComponent } from './components/crud/crud-pet/crud-pet.component';
import { CrudClientComponent } from './components/crud/crud-client/crud-client.component';

import { CrudClinicHistoryComponent } from './components/crud/crud-clinic-history/crud-clinic-history.component';
import { CrudHistoryDetailComponent } from './components/crud/crud-history-detail/crud-history-detail.component';

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
