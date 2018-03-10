/* tslint:disable */
import { ENV_DEV } from '../../constants/env-constants';

const loggingMiddleware = (store:any) => (next:any) => (action:any) => {
    if (process.env.NODE_ENV === ENV_DEV) {
        console.info('%cINFO:', 'color: yellow', `Dispatching a ${action.type} action with payload:`, action.payload);
        const result = next(action);
        console.info('%cNext State:','color: cyan', store.getState());
        return result;
    }
};

export default loggingMiddleware;