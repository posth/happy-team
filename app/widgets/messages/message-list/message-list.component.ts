import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Message } from "../message.model";
import { MessageService } from "../message.service";
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService,
        private _authService: AuthService) { }

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }
}