import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationComponent } from './notification/notification.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from './shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ManageUserComponent } from './user-manangement/manage-user/manage-user.component';
import { CreateUserComponent } from './user-manangement/create-user/create-user.component';
import { ManageAgentComponent } from './agent-manangement/manage-agent/manage-agent.component';
import { CreateAgentComponent } from './agent-manangement/create-agent/create-agent.component';
import { ManageOrderComponent } from './order-manangement/manage-order/manage-order.component';
import { ManageRatesComponent } from './rates/manage-rates/manage-rates.component';
import { CreateRatesComponent } from './rates/create-rates/create-rates.component';
import { ManangeCouponComponent } from './coupon/manange-coupon/manange-coupon.component';
import { CreateCouponComponent } from './coupon/create-coupon/create-coupon.component';


@NgModule({
  declarations: [
    AppComponent,
    DeviceDetailComponent,
    DeviceUserComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    DashboardComponent,
    NotificationComponent,
    AccountComponent,
    ManageUserComponent,
    CreateUserComponent,
    ManageAgentComponent,
    CreateAgentComponent,
    ManageOrderComponent,
    ManageRatesComponent,
    CreateRatesComponent,
    ManangeCouponComponent,
    CreateCouponComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    NgxDatatableModule
  ],
  providers: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
