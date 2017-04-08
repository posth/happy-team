import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { MessagesComponent } from "./messages.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageComponent } from "./message-component/message.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageService } from "./message.service";
import { MessageTeamComponent } from './message-team/message-team.component';
import { MessageTeamService } from './message-team/message-team.service';

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent,
        MessageTeamComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule
    ],
    exports: [
        MessageListComponent,
        MessageInputComponent,
        MessageTeamComponent
    ],
    providers: [
        MessageService,
        MessageTeamService
    ] 
})
export class MessageModule { }