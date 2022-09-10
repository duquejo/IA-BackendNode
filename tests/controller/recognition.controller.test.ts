import { RecognitionController } from '../../src/controller/recognition.controller';
import { RecognitionService } from '../../src/service/recognition.service';
import { parseRecognizedText } from '../../src/utils/string';

jest.mock( '../../src/utils/string', () => ({
    parseRecognizedText: jest.fn( () => false ),
}));

/**
 * Recognition Controller Testing
 */
describe('Recognition Controller Testing', () => {

    const recognitionService = new RecognitionService();

    const recognize = jest.spyOn( recognitionService, 'recognize' );

    const recognitionWorker = jest
        .spyOn( RecognitionService.prototype as any, 'recognitionWorker') // eslint-disable-line @typescript-eslint/no-explicit-any
        .mockImplementation();

    const recognitionController = new RecognitionController( recognitionService );

    

    /**
     * Reset mocks per unit test.
     */
    afterEach( () => jest.resetAllMocks() );

    it('Should execute recognize method and its dependencies', async () => {

        // Arrange & Act
        const result = await recognitionController.recognize( 'Something in her eyes' );
        const resultBody = JSON.parse( result.body );

        // Assert
        // Returning properties
        expect( result ).toEqual( expect.objectContaining({
            body: expect.any(String),
            headers: expect.any(Object),
            statusCode: expect.any(Number),
        }));

        // Inner properties
        expect( resultBody ).toEqual( expect.objectContaining({
            message: expect.any(String),
            data: {
                recognized: expect.any(Boolean),
                letter: expect.any(Boolean)
            },
        }));
        
        // Inner calls
        expect( recognize ).toHaveBeenCalled();
        expect( recognitionWorker ).toHaveBeenCalledTimes(1);
        expect( parseRecognizedText ).toHaveBeenCalled();
    });
});