import { IAppState, appStateFactory } from "../models/app.model";
import { IActionType } from "../types";
import { Dispatch } from "redux";

/** ACTIONS */

export const APP_SET_INIT = 'APP_SET_INIT';
export const APP_SET_LOADED = 'APP_SET_LOADED';

/** ACTION CREATORS */

export const appSetInitAction = (init: boolean) =>
    (dispatch: Dispatch) =>
    dispatch({
        type: APP_SET_INIT,
        payload: { init },
    });

export const appSetLoadedAction = (loaded: boolean) =>
    (dispatch: Dispatch) =>
    dispatch({
        type: APP_SET_LOADED,
        payload: { loaded },
    });

/**
 * app state reducer
 * @param state {IAppState}
 * @param action {IActionType<IAppState>}
 */
const appReducer = (state: IAppState = appStateFactory(), action: IActionType<IAppState>): IAppState => {
    const { type } = action;
    switch (type) {
        case APP_SET_INIT:
            return {
                ...state,
                init: action.payload!.init,
            };
        case APP_SET_LOADED:
            return {
                ...state,
                loaded: action.payload!.loaded,
            };
        default:
            return state;
    }
};

export default appReducer;
