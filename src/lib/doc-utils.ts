
import mammoth from 'mammoth';

// --- DOCUMENT ANALYSIS ---

/**
 * Counts paragraphs written entirely in uppercase.
 * @param text The text content of the document.
 * @returns The number of all-caps paragraphs found.
 */
export const countAllCapsParagraphs = (text: string): number => {
  if (!text) return 0;
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');
  return paragraphs.filter(p => p === p.toUpperCase() && /[A-Z]/.test(p)).length;
};

/**
 * Counts lines that do not end with punctuation.
 * @param text The text content of the document.
 * @returns The number of lines without trailing punctuation.
 */
export const countIncorrectParagraphBreaks = (text: string): number => {
  if (!text) return 0;
  const lines = text.split('\n').filter(p => p.trim() !== '');
  const punctuation = ['.', '?', '!', ':', ';'];
  return lines.filter(line => line.length > 0 && !punctuation.includes(line.trim().slice(-1))).length;
};


/**
 * Analyzes the document to identify its structure based on headings.
 * For now, it checks for the presence of any heading tags.
 * @param html The HTML content of the document.
 * @returns A boolean indicating if a valid structure is found.
 */
export const analyzeStructure = (html: string): boolean => {
    // A simple check for now: if there are any headings, we assume a valid structure.
    const headingRegex = /<h[1-6][^>]*>.*?<\/h[1-6]>/i;
    return headingRegex.test(html);
};


// --- DOCUMENT CONVERSION & PROCESSING ---

/**
 * Reads a .docx file and converts its content to HTML.
 * @param arrayBuffer The ArrayBuffer of the .docx file.
 * @returns A promise that resolves with the HTML content as a string.
 */
export const convertDocxToHtml = async (arrayBuffer: ArrayBuffer): Promise<string> => {
  try {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    return result.value; // The HTML content
  } catch (error) {
    console.error("Error converting .docx to HTML:", error);
    throw new Error("Failed to read the .docx file.");
  }
};
