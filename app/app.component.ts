import { Component } from '@angular/core';
import { HeaderService } from './header/header.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private pushAppContent: boolean = false;
    _menuIsActiveSubscription: Subscription;

    constructor(private _headerService: HeaderService) {
        this._menuIsActiveSubscription = this._headerService.menuIsActiveChanged$.subscribe(
            menuIsActive => this.pushAppContent = menuIsActive
        );

    }
}