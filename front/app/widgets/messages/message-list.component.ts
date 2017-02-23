import { Component, OnInit } from "@angular/core";

import { Message } from "./message.model";
import { MessageService } from "./message.service";

import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-7 col-md-offset-3">
            <app-message
                   [message]="message"
                    *ngFor="let message of messages"></app-message>
        </div>
        <app-message-input *ngIf="isLoggedIn()"></app-message-input>
    `
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