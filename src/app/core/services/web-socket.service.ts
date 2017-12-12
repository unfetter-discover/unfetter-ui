import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';

@Injectable()
export class WebsocketService {
    private socket;
    private connected: boolean = false;
    private socketSubject: Subject<MessageEvent>;
    private url = 'https://localhost:3000';

    constructor() {
        this.initConnection();
    }

    public initConnection(): void {
        this.socket = io(this.url, { secure: true });

        this.socket.on('connect', () => {
            console.log('Successfully connected to socket server');
            this.connected = true;
        });

        const observable = new Observable((socketObserver: any) => {
            this.socket.on('message', (data) => {
                console.log('Received message from Websocket Server')
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

        this.socketSubject = Subject.create(observer, observable);
    }

    public connect(messageType: WSMessageTypes): Observable<any> {
        return this.socketSubject
            .filter((message: any) => message.messageType === messageType)
            .pluck('messageContent');
    }
}
