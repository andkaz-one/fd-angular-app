import {Injectable, signal, WritableSignal} from '@angular/core';
import {IEvent, IEventResponse} from '../interfaces/index';
import {BehaviorSubject, debounceTime, map, Observable, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  // Enable progress bar loading
  isLoadingSignal: WritableSignal<boolean> = signal(true);

  private mockData$: BehaviorSubject<IEventResponse> = new BehaviorSubject<IEventResponse>(
    {
      "events": [
        {
          "deviceId": "A23",
          "eventDate": 1710355477,
          "type": "deviceMalfunction",
          "evtData": {
            "reasonCode": 12,
            "reasonText": "temp sensor not responding"
          }
        },
        {
          "deviceId": "A23",
          "eventDate": 1710354477,
          "type": "deviceMalfunction",
          "evtData": {
            "reasonCode": 11,
            "reasonText": "no power"
          }
        },
        {
          "deviceId": "F12HJ",
          "eventDate": 1710353477,
          "type": "temperatureExceeded",
          "evtData": {
            "temp": 10.3,
            "threshold": 8.5
          }
        },
        {
          "deviceId": "D12-1-12",
          "eventDate": 1710352477,
          "type": "doorUnlocked",
          "evtData": {
            "unlockDate": 1710350477
          }
        }
      ]
    }
  )


  data$: Observable<IEvent[]> = this.mockData$.asObservable().pipe(
    debounceTime(2000), // Simulate loading from API
    map((data: IEventResponse) => data.events.map((e: IEvent) => ({
      ...e,
      eventDate: new Date(e.eventDate as number * 1000)
    }))), // Convert unix timestamp t date
    tap(() => this.isLoadingSignal.set(false)) // Disable progress bar
  );

}
