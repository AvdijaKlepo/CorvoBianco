import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public hubConnection: signalR.HubConnection;
  public static ConnectionId: string | null | undefined;

  constructor(private snackBar: MatSnackBar) {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7162/hub-putanja')
      .withAutomaticReconnect()
      .build();
    console.log(this.hubConnection);

    this.hubConnection.on('prijem_poruke_js', (message) => {
      this.snackBar.open(message, 'Close', {
        duration: 5000,
      });
      console.log('Received message:', message);

    });

    this.hubConnection.onreconnected(connectionId => {
      SignalRService.ConnectionId = connectionId;
      console.log('Reconnected: ' + connectionId);
    });

    this.hubConnection.onclose(() => {
      SignalRService.ConnectionId = null;
      console.log('Connection closed');
    });


    this.hubConnection.on('error', error => {
      console.error('SignalR error:', error);
    });


    this.hubConnection.onreconnecting(error => {
      console.log('Reconnecting:', error);
    });
  }

  startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        SignalRService.ConnectionId = this.hubConnection.connectionId;
        console.log('Connection started: ' + this.hubConnection.connectionId);
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }
}
