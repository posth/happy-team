import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../user/user.model';

@Component({
    selector: 'app-admin-user-description',
    templateUrl: './admin-user-description.component.html',
    styleUrls:  ['./admin-user-description.component.css']
})
export class AdminUserDescriptionComponent implements OnInit {

    @Input() user: User;

    constructor() { }

    ngOnInit() { }
}