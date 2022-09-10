import { Service } from 'typedi';
import { createWorker, PSM, Worker } from 'tesseract.js';
import { TESSERACT_CONSTANTS, STATUS_CODES } from '../constants/constants';
import { MessageUtil } from '../utils/message';
import { IHandlerResponse } from '../interfaces/handler.interface';
import { parseRecognizedText } from '../utils/string';

@Service()
export class RecognitionService {
    /**
     * It takes an image, sends it to the recognitionWorker function, which returns a string of recognized
     * text, which is then parsed by the parseRecognizedText function, which returns a string of the
     * recognized letter.
     *
     * If the image is not present, or the letter is not recognized, it returns an error.
     *
     * If the letter is recognized, it returns a success message.
     * @param {string | null} image - string | null
     * @returns A promise that resolves to an object with the following properties:
     */
    async recognize(image: string | null): Promise<IHandlerResponse> {
        try {
            if (!image) {
                throw new Error('No image present at body');
            }

            const results = await this.recognitionWorker(image);
            const parsedResults = parseRecognizedText(results);

            if (!parsedResults) {
                throw new Error('Letter not recognized');
            }

            return MessageUtil.success({
                recognized: true,
                letter: parsedResults,
            });
        } catch (error: unknown) {
            const typedError = error as Error;

            return MessageUtil.error(
                {
                    recognized: false,
                    letter: false,
                },
                STATUS_CODES.STATUS_NOT_FOUND,
                typedError?.message,
            );
        }
    }

    /**
     * "This function takes an image as a string, and returns a string of the text recognized by
     * Tesseract."
     * The function then returns the recognition results.
     * @param {string} image - string - The image to be recognized.
     * @returns The recognitionResults is a string of the text that was recognized.
     */
    private async recognitionWorker(image: string): Promise<string> {
        const worker: Worker = createWorker();
        await worker.load();
        await worker.loadLanguage(TESSERACT_CONSTANTS.TESSERACT_LANGUAGE);
        await worker.initialize(TESSERACT_CONSTANTS.TESSERACT_LANGUAGE);
        await worker.setParameters({
            tessedit_pageseg_mode: PSM.SINGLE_CHAR,
            tessedit_char_whitelist: TESSERACT_CONSTANTS.TESSERACT_WHITELIST,
            preserve_interword_spaces:
                TESSERACT_CONSTANTS.TESSERACT_PRESERVE_INTERWORD_SPACES,
        });
        const {
            data: { text: recognitionResults },
        } = await worker.recognize(image);
        await worker.terminate(); // Finalize results.
        return recognitionResults;
    }
}
