import { Routes, RouterModule } from "@angular/router";
// import { AuthenticationComponent } from "./auth/authentication.component";
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import { UserStatusService } from './user/user-status.service';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: 'team',
        component: TeamComponent,
        canActivate: [UserStatusService]
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [UserStatusService]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [UserStatusService]
    },
    { path: '**', redirectTo: 'signin' }
    // { path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);