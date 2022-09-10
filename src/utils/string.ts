/**
 * It takes a string, removes special characters, and returns the first character of the string
 * @param {string} text - string - The text that was recognized by the OCR recognition service.
 * @returns The first letter of the word that was recognized or false if fails.
 */
export const parseRecognizedText = (text: string): string | false => {
    if (!text) return false;
    // Special chars remove
    text = text.replace(/(\r\n|\n|\r|\t)/gm, '');
    // Not recognized word fallback
    if (text === '') return false;
    // Multiple word cond (Get only the first recognized one.)
    if (text.length > 1) text = text.substring(0, 1);
    return text;
};
