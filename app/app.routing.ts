import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from './auth/signin/signin.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';

import { UserStatusService } from './user/user-status.service';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SigninComponent },
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
];

export const routing = RouterModule.forRoot(APP_ROUTES);