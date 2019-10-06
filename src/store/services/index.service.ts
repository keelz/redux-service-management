import middlewareServiceManager from "../MiddlewareManager";
import appServices from "./app.service";

// this could probably use some work...
const loadServices = () => {
    appServices.forEach(service => middlewareServiceManager.addService(service[0], service[1]));
}

export default loadServices;
