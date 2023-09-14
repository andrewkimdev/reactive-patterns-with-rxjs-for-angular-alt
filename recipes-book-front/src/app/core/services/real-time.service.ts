import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, EMPTY, map, Observable, retry, Subject, takeUntil } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Message } from '../model/message.model';
import { environment } from '../../../environments/environment';

const WS_ENDPOINT = environment.wsEndpoint;
const RECONNECT_INTERVAL = environment.reconnectInterval;

@Injectable({
  providedIn: 'root'
})
export class RealTimeService implements OnDestroy {

  private socket$?: WebSocketSubject<Message>;
  private messageSubject = new BehaviorSubject<Message>({ key: '', message: '' });
  message$ = this.messageSubject.asObservable();

  constructor() {
  }

  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getNewWebSocket(): WebSocketSubject<Message> {
    return webSocket({
      url: WS_ENDPOINT,
      closeObserver: {
        next: () => {
          console.log('[DataService] Connection closed');
          this.socket$ = undefined;
          this.connect({ reconnect: true });
        }
      }
    });
  }

  close() {
    this.socket$?.complete();
  }

  public connect(cfg = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.socket$.pipe(
        takeUntil(this.destroy$),
        tap((msg) => this.messageSubject.next(msg)),
        cfg.reconnect ? this.reconnect : o => o,
        catchError(e => {
          console.error('Connection error: ', e);
          return EMPTY;
        }),
      ).subscribe();
    }
  }

  private reconnect(msg$: Observable<Message>): Observable<Message> {
    return msg$.pipe(
      tap({
        error: val => console.log(`[Data Service] Try to reconnect...,${val}`)
      }),
      retry({
        count: Infinity,  // Retry indefinitely. Adjust as needed.
        delay: RECONNECT_INTERVAL
      })
    );
  }
}
