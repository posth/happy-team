import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { MessagesComponent } from "./messages.component";
import { MessageListComponent } from "./message-list/message-list.component";
import { MessageComponent } from "./message-component/message.component";
import { MessageInputComponent } from "./message-input/message-input.component";
import { MessageService } from "./message.service";

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    exports: [
        MessageListComponent,
        MessageInputComponent
    ],
    providers: [MessageService]
})
export class MessageModule {

}