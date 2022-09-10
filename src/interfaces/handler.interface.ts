import { STATUS_CODES } from '../constants/constants';

export interface IHandlerResponse {
    statusCode: STATUS_CODES;
    headers: object;
    body: string;
}
