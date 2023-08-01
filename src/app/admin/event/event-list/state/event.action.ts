import { createAction, props } from '@ngrx/store';
import { EventData } from './event.interface';


export const loadAllEvent = createAction('[AllEvent] Load All Event');

export const loadAllEventSuccess = createAction('[AllAdmissiom] Load All Event Success', props<{ allEvents: EventData[] }>());

export const loadAllEventFailure = createAction('[Event] Load Event Failure', props<{ error: string }>());