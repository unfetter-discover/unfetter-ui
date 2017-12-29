import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';

import { WSMessageTypes } from '../../global/enums/ws-message-types.enum';
import { AuthService } from './auth.service';
import * as fromApp from '../../root-store/app.reducers';
import * as fromUser from '../../root-store/users/users.reducers';

@Injectable()
export class WebsocketService {
    private socket;
    private connected: boolean = false;
    private socketSubject: Subject<MessageEvent>;
    // TODO change this
    private url = '/';

    constructor(
        private authService: AuthService,
        private store: Store<fromApp.AppState>
    ) {
        this.initConnection();    
    }

    public initConnection(): void {
        const getAuthUser$ = this.store.select('users')
            .filter((user: fromUser.UserState) => user.authenticated)
            .take(1)
            .pluck('token')
            .subscribe(
                (userToken: string) => {
                    console.log('Starting connection!');
                    this.socket = io(this.url, {
                        path: '/socketserver/socket',
                        secure: true,
                        query: `token=${userToken}`
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
                        next: (messageEvent: MessageEvent) => {
                            this.socket.emit('message', messageEvent.data);
                        },
                    };

                    this.socketSubject = Subject.create(observer, observable).share();
                    
                },
                (err) => {
                    console.log(err);
                },
                () => {
                    if (getAuthUser$) {
                        getAuthUser$.unsubscribe();
                    }
                }
            );
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

    public sendMessage(data: {}) {
        this.socketSubject.next(new MessageEvent('message', {
            data
        }));
    }
}
