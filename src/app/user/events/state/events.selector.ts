import { EventDataUser } from './events.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selecteventUserState = createFeatureSelector<EventDataUser[]>('AllEventUser')

export const selectAlleventUserData = createSelector(selecteventUserState, (state: EventDataUser[]) => { return state })
