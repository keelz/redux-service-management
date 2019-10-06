import { IAppState, appStateFactory } from "./app.model";

export interface IRootState {
    app: IAppState;
}

export const rootStateFactory = (state?: IRootState): IRootState => ({
    app: appStateFactory(),
    ...state,
});
