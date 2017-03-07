import { Component, OnInit, OnDestroy } from "@angular/core";

import { Message } from "../message.model";
import { MessageService } from "../message.service";

import { AuthService } from '../../../auth/auth.service';

import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
    messages: Message[];

    // private messagesSubscription: Subscription;
    // private timerSubscription: Subscription;

    constructor(private messageService: MessageService,
        private _authService: AuthService) { }

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
            (messages: Message[]) => {
                this.messages = messages;
                // this.refreshMessageList();
            }
            );
    }

    //Unsubscribe on component destruction to prevent memory leak
    ngOnDestroy() {
        // if(this.messagesSubscription) {
        //     this.messagesSubscription.unsubscribe();
        // }
        // if(this.timerSubscription) {
        //     this.timerSubscription.unsubscribe();
        // }
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    // refreshMessageList(): void {
    //     this.messagesSubscription = this.messageService.getMessages().subscribe(messages => {
    //         this.messages = messages;
    //         this.subscribeToMessageList();
    //     });
    // }

    // subscribeToMessageList(): void {
    //     this.timerSubscription = Observable.timer(3000).first().subscribe(() => this.refreshMessageList());
    // }

}