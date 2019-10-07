import { MiddlewareAPI, Dispatch } from "redux";
import { IActionType } from "./types";

export type MiddlewareServiceContainer = [string, MiddlewareServiceAction][];

export type MiddlewareServiceAction = (api: MiddlewareAPI) =>
    (action: IActionType<any>) => Promise<void>;

export interface IMiddlewareServiceManager {
    addService: (name: string, action: MiddlewareServiceAction) => void;
    execute: MiddlewareServiceAction;
}

export interface IMiddlewareService {
    name: string;
    action: MiddlewareServiceAction;
}

class MiddlewareServiceManager implements IMiddlewareServiceManager {
    _services: IMiddlewareService[] = [];

    addService(name: string, action: MiddlewareServiceAction) {
        this._services = [...this._services, { name, action }];
    }

    execute = (api: MiddlewareAPI) => async (action: IActionType<any>) => {
        const service = this._services.find(service => service.name === action.type);
        if (!!service) {
            return await service.action(api)(action);
        }
        console.log(`service handler for ${action.type} not found`);
    }
}

export const serviceMiddleware = (api: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action: IActionType<any>) => {
        next(action);
        serviceManager.execute(api)(action);
    }

const serviceManager = new MiddlewareServiceManager();

export default serviceManager;
