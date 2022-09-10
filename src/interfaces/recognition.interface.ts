import { IHandlerResponse } from './handler.interface';

export interface IRecognitionService {
    recognize: (image: string) => Promise<IHandlerResponse>;
    recognitionWorker: (image: string) => Promise<string>;
    parseRecognizedText: (text: string) => string | false;
}

export interface IRecognitionResponse {
    recognized: boolean;
    letter: string | false;
}
