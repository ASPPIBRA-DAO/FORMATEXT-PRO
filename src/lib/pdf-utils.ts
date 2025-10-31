import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Defines the structure for style settings
export interface StyleSettings {
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  spacingBefore: number;
  spacingAfter: number;
  // Page layout settings
  pageSize: 'a4' | 'letter' | 'legal';
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  // Table of contents
  includeToc: boolean;
}

/**
 * Applies styles to the HTML content by injecting a <style> tag.
 * @param html The base HTML content.
 * @param styles The style settings to apply.
 * @returns HTML string with an embedded stylesheet.
 */
const applyStylesToHtml = (html: string, styles: StyleSettings): string => {
  const style = `
    body {
      font-family: ${styles.fontFamily}, sans-serif;
      font-size: ${styles.fontSize}pt;
      text-align: ${styles.textAlign};
      line-height: 1.5;
    }
    p {
      margin-top: ${styles.spacingBefore}pt;
      margin-bottom: ${styles.spacingAfter}pt;
    }
    /* Add more specific styles for h1, h2, etc. as needed */
  `;

  return `<style>${style}</style>${html}`;
};

/**
 * Generates and downloads a PDF from HTML content and style settings.
 * @param htmlContent The original HTML content from the document.
 * @param styles The user-defined style settings.
 * @param theme The selected PDF theme (e.g., 'Corporate Report').
 */
export const generatePdf = async (htmlContent: string, styles: StyleSettings, theme: string) => {
  if (!htmlContent) {
    alert('Please upload a document first.');
    return;
  }

  // 1. Create a hidden element to render the styled HTML
  const container = document.createElement('div');
  // This container is off-screen
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '800px'; // Approx. A4 width for rendering
  document.body.appendChild(container);

  // 2. Apply styles and content
  container.innerHTML = applyStylesToHtml(htmlContent, styles);

  // 3. Render the element to a canvas
  const canvas = await html2canvas(container, {
    scale: 2, // Improve resolution
    useCORS: true,
  });

  // 4. Clean up the hidden element
  document.body.removeChild(container);

  // 5. Create PDF from canvas
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt', // Use points to match font sizes
    format: styles.pageSize,
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const ratio = canvasWidth / pdfWidth;
  const calculatedHeight = canvasHeight / ratio;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, calculatedHeight);
  pdf.save(`${theme.replace(/\s+/g, '-').toLowerCase()}_${new Date().toISOString()}.pdf`);
};
