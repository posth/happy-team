import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Message } from "../message.model";
import { MessageService } from "../message.service";

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    private _messagesSubscription: Subscription;

    constructor(private messageService: MessageService) { 
        this._messagesSubscription = this.messageService.messagesSubjectChanged$.subscribe(
            messagesSubject => this.messages = messagesSubject
        );
    }

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
            }
            );
    }

}