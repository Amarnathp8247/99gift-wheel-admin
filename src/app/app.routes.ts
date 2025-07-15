import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/layout-pages/login-page/login-page.component';
import { DashboardComponent } from './components/view-pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { UserManagementComponent } from './components/view-pages/user-management/user-management.component';
import { SpinConfigurationComponent } from './components/view-pages/spin-configuration/spin-configuration.component';
import { PrizeManagementComponent } from './components/view-pages/prize-management/prize-management.component';
import { WalletComponent } from './components/view-pages/wallet/wallet.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // canActivate: [authGuard] // ✅ protected route
      },
      {
        path: 'users',
        component: UserManagementComponent,
        // canActivate: [authGuard] // ✅ protected route
      },
      {
        path: 'spin-config',
        component: SpinConfigurationComponent,
        // canActivate: [authGuard] // ✅ protected route
      },
      {
        path: 'prize',
        component: PrizeManagementComponent,
        // canActivate: [authGuard] // ✅ protected route
      },
      {
        path: 'wallet', 
        component: WalletComponent,
        // canActivate: [authGuard] // ✅ protected route
      },
      {
        path: '**',
        redirectTo: 'login'
      }
];
