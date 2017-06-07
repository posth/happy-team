import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from "../auth/auth.service";
import { UserStatusService } from '../user/user-status.service';
import { HeaderService } from './header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    private adminStatus: boolean;
    _adminStatusSubscription: Subscription;

    private loggedInStatus: boolean;
    _loggedInStatusSubscription: Subscription;

    private showSideMenu: boolean = false;
    _menuIsActiveSubscription: Subscription;

    constructor(private router: Router,
        private _authService: AuthService,
        private _userStatusService: UserStatusService,
        private _headerService: HeaderService) {
        this._adminStatusSubscription = this._userStatusService.adminStatusValueChanged$.subscribe(
            adminStatusValue => this.adminStatus = adminStatusValue
        );
        this._loggedInStatusSubscription = this._userStatusService.isLoggedInValueChanged$.subscribe(
            isLoggedInValue => this.loggedInStatus = isLoggedInValue
        );
        this._menuIsActiveSubscription = this._headerService.menuIsActiveChanged$.subscribe(
            menuIsActive => this.showSideMenu = menuIsActive
        )
    }

    onLogout(): void {
        this._authService.logout();
        this._headerService.menuIsActive.next(false);
        this.loggedInStatus = false;
        this.router.navigateByUrl('/home');
    }

    goHome(): void {
        this.router.navigateByUrl('/home');
    }

    showMenu(): void {
        //Toggle the boolean to show the side menu
        this._headerService.toggleSideMenu();
    }

}