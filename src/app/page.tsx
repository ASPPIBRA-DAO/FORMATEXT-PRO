'use client';

import { useState } from 'react';
import { AnalysisCard } from '@/components/dashboard/analysis-card';
import { GenerateCard } from '@/components/dashboard/generate-card';
import { SettingsCard } from '@/components/dashboard/settings-card';
import { UploadCard } from '@/components/dashboard/upload-card';
import {
  convertDocxToHtml,
  countAllCapsParagraphs,
  countIncorrectParagraphBreaks,
  analyzeStructure,
} from '@/lib/doc-utils';
import { generatePdf, StyleSettings } from '@/lib/pdf-utils';

export interface AnalysisResults {
  allCaps: number;
  noPunctuation: number;
  isValid: boolean | null;
}

export default function Home() {
  // State for analysis
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults>({ allCaps: 0, noPunctuation: 0, isValid: null });
  const [isLoading, setIsLoading] = useState(false);
  
  // State for document content and styling
  const [htmlContent, setHtmlContent] = useState('');
  const [theme, setTheme] = useState('Corporate Report');
  const [styles, setStyles] = useState<StyleSettings>({
    fontFamily: 'Inter',
    fontSize: 12,
    textAlign: 'left',
    spacingBefore: 0,
    spacingAfter: 8,
    pageSize: 'a4',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
    includeToc: true,
  });

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    const arrayBuffer = await file.arrayBuffer();

    try {
      const html = await convertDocxToHtml(arrayBuffer);
      const text = html.replace(/<[^>]+>/g, '\n');

      setHtmlContent(html);
      setAnalysisResults({
        allCaps: countAllCapsParagraphs(text),
        noPunctuation: countIncorrectParagraphBreaks(text),
        isValid: analyzeStructure(html),
      });
    } catch (error) {
      console.error(error);
      // Consider showing a toast notification for the error
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePdf = () => {
    generatePdf(htmlContent, styles, theme);
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <UploadCard onFileSelect={handleFileUpload} isLoading={isLoading} />
            <AnalysisCard analysisResults={analysisResults} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <SettingsCard styles={styles} setStyles={setStyles} />
            <GenerateCard 
              theme={theme}
              setTheme={setTheme}
              onGeneratePdf={handleGeneratePdf} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}
