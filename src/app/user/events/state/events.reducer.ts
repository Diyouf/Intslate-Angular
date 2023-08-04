import { EventDataUser } from './events.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './events.action'



const intiialState : EventDataUser[] = []
type EventAction = typeof action.loadAllEventUserSuccess

const eventUserGetReducer = createReducer(
    intiialState,
    on(action.loadAllEventUserSuccess, (_state, { allEvents }) => {
       return allEvents
    })
)

export function _eventUserGetReducer(state:EventDataUser[],action:EventAction){
    return eventUserGetReducer(state,action)
}