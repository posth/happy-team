import { Component } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { Message } from "../message.model";
import { MessageTeamService } from "./message-team.service";

@Component({
    selector: 'app-message-team',
    templateUrl: './message-team.component.html',
    styleUrls: ['./message-team.component.css']
})
export class MessageTeamComponent {

    messages: Message[];
    teamMessagesSubscription: Subscription;

    constructor(private _messageTeamService: MessageTeamService) {
        //Subscribe to all team messages but only show the latest 5 on this component
        this.teamMessagesSubscription = this._messageTeamService.latestTeamMessagesChanged$.subscribe(
            latestTeamMessages => this.messages = latestTeamMessages.slice(Math.max(latestTeamMessages.length - 5, 0))
        );
    }

}