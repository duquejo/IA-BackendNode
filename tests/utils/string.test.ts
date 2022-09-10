import { parseRecognizedText } from '../../src/utils/string';

describe('String utils tests', () => {
    it('Should parse a text and return it sanitized successfully', () => {
        // Arrange
        const recognizedText = '\tO\n\r\t\t';
        // Act
        const sanitizedText = parseRecognizedText( recognizedText );
        // Assert
        expect( sanitizedText ).toBe( 'O' );
    });

    it('Should return false if an Argument isn\'t provided', () => {
        // Arrange
        const recognizedText = '';
        // Act
        const sanitizedText = parseRecognizedText( recognizedText );
        // Assert
        expect( sanitizedText ).toBeFalsy();
    });

    it('Should return false if the recognized chain is empty', () => {
        // Arrange
        const recognizedText = '\n\r\t';
        // Act
        const sanitizedText = parseRecognizedText( recognizedText );
        // Assert
        expect( sanitizedText ).toBeFalsy();
    });

    it('Should remove all recognized subsequent letters when Tesseract return more than one', () => {
        // Arrange
        const recognizedText = '\nO\n\r\tX\tY';
        // Act
        const sanitizedText = parseRecognizedText( recognizedText );
        // Assert
        expect( sanitizedText ).toBe( 'O' );
    });
});