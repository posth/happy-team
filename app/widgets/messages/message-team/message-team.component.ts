import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";

import { Message } from "../message.model";
import { MessageTeamService } from "./message-team.service";

@Component({
    selector: 'app-message-team',
    templateUrl: './message-team.component.html',
    styleUrls: ['./message-team.component.css']
})
export class MessageTeamComponent implements OnInit {

    messages: Message[];
    teamMessagesSubscription: Subscription;

    constructor(private _messageTeamService: MessageTeamService) { 
        this.teamMessagesSubscription = this._messageTeamService.latestTeamMessagesChanged$.subscribe(
            latestTeamMessages => this.messages = latestTeamMessages
        );
    }

    ngOnInit() {
        // this.messageService.getMessages()
        //     .subscribe(
        //     (messages: Message[]) => {
        //         this.messages = messages;
        //     }
        //     );
    }

}