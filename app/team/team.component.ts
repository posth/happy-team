import { Component, OnInit } from '@angular/core';

// import { HeaderService } from '../header/header.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls:  ['./team.component.css']
})
export class TeamComponent implements OnInit {
    constructor() { }

    ngOnInit() { 
        // this._headerService.setAdminStatusFromService();
    }
}