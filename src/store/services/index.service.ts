import serviceManager from "../MiddlewareManager";
import appServices from "./app.service";

// add all services into service manager
const loadServices = () => {
    appServices.forEach(service => serviceManager.addService(service[0], service[1]));
}

export default loadServices;
