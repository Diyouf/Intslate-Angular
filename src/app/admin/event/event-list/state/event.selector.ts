import { EventData } from './event.interface'
import { createFeatureSelector, createSelector } from '@ngrx/store'

export const selecteventState = createFeatureSelector<EventData[]>('AllEvent')

export const selectAlleventData = createSelector(selecteventState, (state: EventData[]) => { return state })
