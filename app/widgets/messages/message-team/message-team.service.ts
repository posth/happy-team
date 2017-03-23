import { Injectable } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MessageService } from '../message.service';
import { Message } from "../message.model";

import * as io from 'socket.io-client';

@Injectable()
export class MessageTeamService {

    latestTeamMessages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
    latestTeamMessagesChanged$: Observable<Message[]> = this.latestTeamMessages.asObservable();

    private url: string = 'http://localhost:3000';
    private socket: any = null;

    constructor(private _messageService: MessageService) {
        console.log('message team service built');
        this.socket = io(this.url);
        this.socket.on("newUserMessageAdded", function () {
            this.getLatestTeamMessages();
        }.bind(this));

        this.getLatestTeamMessages();

    }

    getLatestTeamMessages() {
        this._messageService.getMessages()
            .subscribe(
            (messages: Message[]) => {
                this.latestTeamMessages.next(messages);
            }
            );
    }

}