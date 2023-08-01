import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap} from 'rxjs/operators';
import * as action from './event.action'
import { Injectable } from '@angular/core';
import { loadEventService } from '../event- list.service';
import { of } from 'rxjs';

@Injectable()
export class AllEventEffect {

    constructor(
        private action$: Actions,
        private service: loadEventService
    ) { }

    LoadUser$ = createEffect(() =>
        this.action$.pipe(
            ofType(action.loadAllEvent),
            mergeMap(() => {
                return this.service.loadEvent().pipe(
                    tap((res)=>{
                        console.log(res);
                        
                    }),
                    map((user) => action.loadAllEventSuccess({ allEvents : Object.values(user) })),
                    catchError((error) => of(action.loadAllEventFailure({ error })))
                )
            }
            )
        )
    )
}