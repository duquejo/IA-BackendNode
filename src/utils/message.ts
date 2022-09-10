import { STATUS_CODES } from '../constants/constants';
import { IHandlerResponse } from '../interfaces/handler.interface';

type DataType = object | string | number | undefined;

class Result {
    private statusCode: STATUS_CODES;
    private message: string;
    private data?: DataType;

    constructor(statusCode: STATUS_CODES, message: string, data?: DataType) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }

    bodyToString(): IHandlerResponse {
        return {
            statusCode: this.statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                message: this.message,
                data: this.data,
            }),
        };
    }
}

export class MessageUtil {
    static success(
        data: object,
        statusCode = STATUS_CODES.STATUS_SUCCESS,
        message = 'Successful operation',
    ): IHandlerResponse {
        return new Result(statusCode, message, data).bodyToString();
    }

    static error(
        data: object,
        statusCode = STATUS_CODES.STATUS_SERVER_ERROR,
        message = 'Something happened',
    ): IHandlerResponse {
        const result = new Result(statusCode, message, data).bodyToString();
        console.error(result);
        return result;
    }
}
