export interface IEventResponse {    
    events: IEvent[]; 
}

export interface IEvent {
    deviceId: string;
    eventDate: number | Date;
    type: EventType;
    evtData: IEventData;
}

export interface IEventData {
    reasonCode?: number;
    reasonText?: string;
    temp?: number;
    threshold?: number;
    unlockDate?: number | string;
}



export type EventType = "deviceMalfunction" | "temperatureExceeded" | "doorUnlocked";