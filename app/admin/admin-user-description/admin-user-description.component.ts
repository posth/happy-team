import { Component, Input } from '@angular/core';

import { User } from '../../user/user.model';
import { AuthService } from '../../auth/auth.service';
import { AdminService } from '../admin.service';

@Component({
    selector: 'app-admin-user-description',
    templateUrl: './admin-user-description.component.html',
    styleUrls: ['./admin-user-description.component.css']
})
export class AdminUserDescriptionComponent {

    @Input() user: User;

    constructor(private _authService: AuthService,
        private _adminService: AdminService) { }

    deleteUser(user: User) {

        this._authService.deleteUser(user)
            .subscribe();

        this._adminService.getUsersList()
            .subscribe();

    }
}