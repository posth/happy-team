import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { Message } from "./message.model";
import { ErrorService } from "../../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) { }

    addMessage(message: Message) { 

        //convert the message into a JSON object
        const body = JSON.stringify(message);

        //Ensure we're sending JSON as that's what the backend is expecting - pass it as a third parameter in the http post service request
        const headers = new Headers({'Content-Type': 'application/json'});

        //Sending the token along with the request in a query string in the URL, if it exists
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        //This sets up the Observable and doesn't send the request
        //Someone needs to subscribe to this observable for it to send
        //it returns from the server a response as a json object, only gives you the data which is attached to the response and converts it to JSON    
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                console.log('message service error ->>', error);

                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            //Map needs an observable
            .map((response: Response) => {

                const messages = response.json().obj;

                let transformedMessages: Message[] = [];

                //Iterating through the received back-end messages into the variable for the front
                for (let message of messages) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }

                this.messages = transformedMessages;

                return transformedMessages;
            })

            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message) {
        //Emit the message passed to this method
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        //convert the message into a JSON object
        const body = JSON.stringify(message);

        const headers = new Headers({'Content-Type': 'application/json'});

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        //Passing message ID to the path since the back end is expecting it
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    //deleting the message passed as a parameter from the messages array at the index of the message passed
    deleteMessage(message: Message) {

        this.messages.splice(this.messages.indexOf(message), 1);

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        //Passing message ID to the path since the back end is expecting it - and deleting it
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}