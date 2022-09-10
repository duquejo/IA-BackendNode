import { handler } from '../src/handler';
import { APIGatewayEvent, APIGatewayProxyCallback, Context } from 'aws-lambda';

describe('Main handler start point', () => {
    it('Should not crash', async () => {
        await handler( {} as APIGatewayEvent, {} as Context, {} as APIGatewayProxyCallback );
    });
});