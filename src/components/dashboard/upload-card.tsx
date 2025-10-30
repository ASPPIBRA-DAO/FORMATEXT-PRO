"use client";

import { UploadCloud } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '@/hooks/use-toast';

export function UploadCard() {
  const { toast } = useToast();

  const handleUploadClick = () => {
    toast({
      title: 'Feature not implemented',
      description: 'Document upload is for demonstration purposes only.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">1. Upload Document</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onClick={handleUploadClick}
          className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary hover:bg-accent/20"
        >
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">
            Click to upload or drag & drop a .docx file
          </p>
          <Button onClick={handleUploadClick}>Browse Files</Button>
        </div>
      </CardContent>
    </Card>
  );
}
