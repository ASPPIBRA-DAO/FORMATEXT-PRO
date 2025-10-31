'use client';

import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';

interface GenerateCardProps {
  theme: string;
  setTheme: (theme: string) => void;
  onGeneratePdf: () => void;
}

export function GenerateCard({ theme, setTheme, onGeneratePdf }: GenerateCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    // In a real app, you might want to show a toast here
    try {
      await onGeneratePdf();
    } catch (error) {
      console.error("PDF Generation failed:", error);
      // Show an error toast
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">3. Generate PDF</CardTitle>
        <CardDescription>
          Select a theme and get your pixel-perfect PDF.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 sm:flex-row">
        <div className="w-full flex-1 space-y-2">
          <Label htmlFor="pdf-theme">PDF Theme</Label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger id="pdf-theme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Corporate Report">Corporate Report</SelectItem>
              <SelectItem value="Academic Thesis">Academic Thesis</SelectItem>
              <SelectItem value="Book Manuscript">Book Manuscript</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full pt-0 sm:w-auto sm:pt-6">
          <Button
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <FileDown className="h-5 w-5" />
            )}
            <span className="ml-2">{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
