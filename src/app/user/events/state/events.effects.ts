import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as action from './events.action'
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EventUserService } from '../events.service';

@Injectable()
export class AllEventUserEffect {

    constructor(
        private action$: Actions,
        private service: EventUserService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(action.loadAllEventUser),
            mergeMap(() => {
                return this.service.loadEvents().pipe(
                    map((user) => action.loadAllEventUserSuccess({ allEvents : Object.values(user) })),
                    catchError((error) => of(action.loadAllEventUserFailure({ error })))
                )
            }
            )
        )
    )
}