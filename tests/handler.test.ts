import { handler } from '../src/handler';
import { APIGatewayEvent, APIGatewayProxyCallback, Context } from 'aws-lambda';
import { image } from '../demo.json';

describe('Main handler start point', () => {
    it('Should not crash', async () => {

        const payload = image as unknown as APIGatewayEvent;

        await handler( payload, {} as Context, {} as APIGatewayProxyCallback );
    });
});