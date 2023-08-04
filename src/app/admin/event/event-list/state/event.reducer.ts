import { EventData } from './event.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './event.action'



const intiialState : EventData[] = []
type EventAction = typeof action.loadAllEventSuccess

const eventGetReducer = createReducer(
    intiialState,
    on(action.loadAllEventSuccess, (_state, { allEvents }) => {
       return allEvents
    })
)

export function _eventGetReducer(state:EventData[],action:EventAction){
    return eventGetReducer(state,action)
}