import { MiddlewareAPI } from "redux";
import { IActionType } from "../types";
import { IAppState } from "../models/app.model";
import { APP_SET_INIT, appSetLoadedAction, APP_SET_LOADED } from "../reducers/app.reducer";
import { MiddlewareServiceAction, MiddlewareServiceContainer } from "../MiddlewareManager";

const appHandleSetInit: MiddlewareServiceAction = ({ dispatch }: MiddlewareAPI) =>
    async (_action: IActionType<IAppState>) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log('app finished initializing')
                appSetLoadedAction(true)(dispatch);
                resolve();
            }, 3000);
        });
    }

const appHandleSetLoaded: MiddlewareServiceAction = (_api: MiddlewareAPI) =>
    async (_action: IActionType<IAppState>) => {
        console.log('app has finished loading');
    }

const appServices: MiddlewareServiceContainer = [
    [APP_SET_INIT, appHandleSetInit],
    [APP_SET_LOADED, appHandleSetLoaded],
]

export default appServices;
