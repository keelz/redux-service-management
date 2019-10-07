/**
 * models
 */
export interface IAppState {
    init: boolean;
    loaded: boolean;
}

/**
 * factories
 */
export const appStateFactory = (state?: IAppState) => ({
    init: false,
    loaded: false,
    ...state,
});
