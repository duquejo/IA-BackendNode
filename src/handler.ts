import 'reflect-metadata';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { Container } from 'typedi';
import { RecognitionController } from './controller/recognition.controller';
import { IHandlerResponse } from './interfaces/handler.interface';

export const handler = async (
    event: APIGatewayEvent,
    context: Context,
    callback?: APIGatewayProxyCallback, // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<IHandlerResponse> => {
    context.callbackWaitsForEmptyEventLoop = false;

    const recognitionController = Container.get<RecognitionController>(
        RecognitionController,
    );
    return recognitionController.recognize(event.body);
};
