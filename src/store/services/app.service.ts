import { MiddlewareAPI } from "redux";
import { IActionType } from "../types";
import { IAppState } from "../models/app.model";
import { APP_SET_INIT, appSetLoadedAction, APP_SET_LOADED } from "../reducers/app.reducer";
import { MiddlewareServiceAction, MiddlewareServiceContainer } from "../MiddlewareManager";

const appHandleInit: MiddlewareServiceAction = ({ dispatch }: MiddlewareAPI) =>
    async (action: IActionType<IAppState>) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log('app init', action);
                appSetLoadedAction(true)(dispatch);
                resolve();
            }, 3000);
        });
    }

const appHandleLoaded: MiddlewareServiceAction = (_api: MiddlewareAPI) =>
    async (_action: IActionType<IAppState>) => {
        console.log('app is loaded');
    }

const appServices: MiddlewareServiceContainer = [
    [APP_SET_INIT, appHandleInit],
    [APP_SET_LOADED, appHandleLoaded],
]

export default appServices;
