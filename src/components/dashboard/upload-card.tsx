'use client';

import { UploadCloud } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useRef } from 'react';

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export function UploadCard({ onFileSelect, isLoading }: UploadCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">1. Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onClick={handleCardClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary hover:bg-accent/20"
        >
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            {isLoading ? 'Analyzing document...' : 'Click to upload or drag & drop a .docx file'}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".docx"
            disabled={isLoading}
          />
          <Button onClick={handleCardClick} disabled={isLoading}>
            Browse Files
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
