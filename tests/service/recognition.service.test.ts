import { RecognitionService } from '../../src/service/recognition.service';
import { image } from '../../demo.json';

describe('Recognition Service Tests', () => {

    const recognitionService = new RecognitionService();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionWorker = jest.spyOn( RecognitionService.prototype as any, 'recognitionWorker' );

    it('Should \'recognize\' an image successfully without crashing', async () => {

        // Arrange
        const letter = 'J';
        recognitionWorker.mockImplementationOnce( () => Promise.resolve( letter ) );

        // Act
        const { statusCode, body } = await recognitionService.recognize( 'something' );
        const { message, data } = JSON.parse( body );
        
        // Assert
        expect( statusCode ).toBe( 200 );
        expect( typeof body ).toBe( 'string' );

        expect( message ).toBe( 'Successful operation' );
        expect( data.recognized ).toBeTruthy();
        expect( data.letter ).toBe( letter );
    });

    it('Should throw error and return a 404 if the image payload isn\'t present', async () => {
        // Arrange
        const letter = '';

        // Act
        const { statusCode, body } = await recognitionService.recognize( letter );
        const { message, data } = JSON.parse( body );

        // Assert
        expect( statusCode ).toBe( 404 );
        expect( message ).toBe( 'No image present at body' );
        expect( data.recognized ).toBeFalsy();
        expect( data.letter ).toBeFalsy();
    });

    it('Should throw error and return a 404 when the payload image is malformed or damaged', async () => {
        // Arrange
        const letter = 'J';
        recognitionWorker.mockImplementationOnce( () => Promise.resolve( '' ) ); // Not recognized

        // Act
        const { statusCode, body } = await recognitionService.recognize( letter );
        const { message, data } = JSON.parse( body );

        // Assert
        expect( statusCode ).toBe( 404 );
        expect( message ).toBe( 'Letter not recognized' );
        expect( data.recognized ).toBeFalsy();
        expect( data.letter ).toBeFalsy();
    });

    it('[e2e] should \'recognize\' an image successfully without crashing using Tesseract.JS ', async () => {

        // Arrange
        const demoImage = image;

        // Act
        const { statusCode, body } = await recognitionService.recognize( demoImage );
        const { message, data } = JSON.parse( body );
        
        // Assert
        expect( statusCode ).toBe( 200 );
        expect( typeof body ).toBe( 'string' );

        expect( message ).toBe( 'Successful operation' );
        expect( data.recognized ).toBeTruthy();
        expect( data.letter ).toBe( 'O' );
    });
});