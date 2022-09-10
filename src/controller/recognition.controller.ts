import { Service } from 'typedi';
import { IHandlerResponse } from '../interfaces/handler.interface';
import { RecognitionService } from '../service/recognition.service';

@Service()
export class RecognitionController {
    constructor(private readonly recognitionService: RecognitionService) {}

    async recognize(image: string | null): Promise<IHandlerResponse> {
        return this.recognitionService.recognize(image);
    }
}
