import { EventData } from './event.interface'
import { createReducer, on } from '@ngrx/store'
import * as action from './event.action'



const intiialState : EventData[] = []

const eventGetReducer = createReducer(
    intiialState,
    on(action.loadAllEventSuccess, (_state, { allEvents }) => {
       return allEvents
    })
)

export function _eventGetReducer(state:any,action:any){
    return eventGetReducer(state,action)
}