import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderService {

    menuIsActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    menuIsActiveChanged$: Observable<boolean> = this.menuIsActive.asObservable();

    toggleSideMenu() {
        this.menuIsActive.next(!this.menuIsActive.value);
    }
}