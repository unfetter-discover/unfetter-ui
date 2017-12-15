import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { AuthService } from './auth.service';

@Injectable()
export class WebsocketService {
    private socket;
    private connected: boolean = false;
    private socketSubject: Subject<MessageEvent>;
    // TODO change this
    private url = '/';

    constructor(private authService: AuthService) {
        this.initConnection();
    }

    public initConnection(): void {
        // TODO don't get token like this
        const token = this.authService.getToken();
        this.socket = io(this.url, {
            path: '/socketserver/socket',  
            secure: true,
            query: `token=${token}`
        });

        this.socket.on('connect', () => {
            console.log('Successfully connected to socket server');
            this.connected = true;
        });

        this.socket.on('error', (err) => {
            console.log('An error occured: ', err);
            this.connected = false;
        });

        const observable = new Observable((socketObserver: any) => {
            this.socket.on('message', (data) => {
                console.log('Received message from Websocket Server', data);
                socketObserver.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });

        const observer = {
            next: (data: any) => {
                this.socket.emit('message', JSON.stringify(data));
            },
        };

        this.socketSubject = Subject.create(observer, observable).share();
    }

    public connect(messageType: WSMessageTypes): Observable<any> {
        return this.socketSubject
            .filter((message: any) => message.messageType === messageType)
            .map((message) => {
                if (message._id) {
                    return {
                        ...message.messageContent,
                        _id: message._id
                    };
                } else {
                    return message.messageContent;
                }
            });
    }
}
