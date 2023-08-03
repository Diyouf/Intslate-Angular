import { createAction, props } from '@ngrx/store';
import { EventDataUser } from './events.interface';


export const loadAllEventUser = createAction('[AllEvent] Load All Event');

export const loadAllEventUserSuccess = createAction('[AllEvents] Load All Event Success', props<{ allEvents: EventDataUser[] }>());

export const loadAllEventUserFailure = createAction('[EventLoadFailure] Load Event Failure', props<{ error: string }>());