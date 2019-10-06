
export interface IAppState {
    init: boolean;
    loaded: boolean;
}

export const appStateFactory = (state?: IAppState) => ({
    init: false,
    loaded: false,
    ...state,
});
