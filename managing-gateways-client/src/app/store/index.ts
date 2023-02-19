import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { storeFreeze } from 'ngrx-store-freeze'
import { environment } from 'src/environments/environment'

export interface IAppState {}
export const reducers: ActionReducerMap<IAppState> = {}
export const metaReducers: MetaReducer<IAppState>[] = !environment.production
  ? [storeFreeze]
  : []
