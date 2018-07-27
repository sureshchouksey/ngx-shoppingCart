import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent} from './dashboard/dashboard.component';
import { DeviceUserComponent } from './device-user/device-user.component';
import { RegisterComponent} from './register/register.component';
import { LoginComponent} from './login/login.component';
import { NotificationComponent} from './notification/notification.component';
import { LogoutComponent} from './logout/logout.component';
import { AccountComponent } from './account/account.component';
import { ManageUserComponent} from './user-manangement/manage-user/manage-user.component';
import { ManageAgentComponent} from './agent-manangement/manage-agent/manage-agent.component';
import { ManageOrderComponent} from './order-manangement/manage-order/manage-order.component';
import { ManangeCouponComponent} from './coupon/manange-coupon/manange-coupon.component';
import { CreateRatesComponent} from './rates/create-rates/create-rates.component';


const ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent }, 
  { path:'register/:Id/:type',component:RegisterComponent},
  { path:'deviceRegister',component:DeviceUserComponent},
  { path:'login',component:LoginComponent},
  { path:'user',component:ManageUserComponent},
  { path:'logout',component:LogoutComponent},
  { path:'account',component:AccountComponent},
  { path:'agent',component:ManageAgentComponent},
  { path:'order',component:ManageOrderComponent},
  { path:'rates',component:CreateRatesComponent},
  { path:'coupon',component:ManangeCouponComponent},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(ROUTES) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}