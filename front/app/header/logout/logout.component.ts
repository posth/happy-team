import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
    constructor(private _authService: AuthService, private router: Router) { }

    onLogout(): void {
        this._authService.logout();
        // this.router.navigate(['/', 'signin']);
    }

    isLoggedIn(): boolean {
        return this._authService.isLoggedIn();
    }

    goSignin(): void {
        this.router.navigate(['/', 'signin']);
    }
}