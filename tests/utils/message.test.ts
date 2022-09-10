import { STATUS_CODES } from '../../src/constants/constants';
import { MessageUtil } from '../../src/utils/message';

describe('Message utils tests', () => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': true,
    };

    const unSuccessfullPayload = {
        recognized: false,
        letter: false,
    };
    const successfullPayload = {
        recognized: true,
        letter: 'A',
    };    
    const unSuccessfullResponse = 'Something happened';
    const successfullResponse = 'Successful operation';

    it('Should return a successfull body response with the minimum fields.', () => {
        // Arrange & Act
        const bodyResponse = MessageUtil.success( successfullPayload );
        const parsedBody = JSON.parse( bodyResponse.body );
        // Assert
        expect( bodyResponse ).toEqual( expect.objectContaining({
            body: expect.any(String),
            headers,
            statusCode: expect.any(Number),
        }));
        expect( parsedBody.data ).toStrictEqual( successfullPayload );
        expect( parsedBody.message ).toBe( successfullResponse );
    });

    it('Should return a unsuccessfull body response with a different status', () => {
        // Arrange & Act
        const bodyResponse = MessageUtil.error( unSuccessfullPayload, STATUS_CODES.STATUS_NOT_FOUND );
        const parsedBody = JSON.parse( bodyResponse.body );
        // Assert
        expect( bodyResponse ).toEqual( expect.objectContaining({
            body: expect.any(String),
            headers,
            statusCode: STATUS_CODES.STATUS_NOT_FOUND,
        }));
        expect( parsedBody.data ).toStrictEqual( unSuccessfullPayload );
        expect( parsedBody.message ).toBe( unSuccessfullResponse );
    });

    it('Should return a failed body response with the minimum fields.', () => {
        // Arrange & Act
        const bodyResponse = MessageUtil.error( unSuccessfullPayload );
        const parsedBody = JSON.parse( bodyResponse.body );
        // Assert
        expect( bodyResponse ).toEqual( expect.objectContaining({
            body: expect.any(String),
            headers,
            statusCode: STATUS_CODES.STATUS_SERVER_ERROR,
        }));
        expect( parsedBody.data ).toStrictEqual( unSuccessfullPayload );
        expect( parsedBody.message ).toBe( unSuccessfullResponse );
    });
});