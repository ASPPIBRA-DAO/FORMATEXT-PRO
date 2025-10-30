"use client";

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
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export function GenerateCard() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateClick = () => {
    setIsGenerating(true);
    toast({
      title: 'Generating PDF...',
      description: 'Your perfectly formatted document is being created.',
    });

    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: 'PDF Generated Successfully!',
        description:
          'In a real app, your download would start automatically.',
        variant: 'default',
        duration: 5000,
      });
    }, 2500);
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
          <Select defaultValue="corporate">
            <SelectTrigger id="pdf-theme">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="corporate">Corporate Report</SelectItem>
              <SelectItem value="academic">Academic Thesis</SelectItem>
              <SelectItem value="manuscript">Book Manuscript</SelectItem>
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
              <Loader2 className="animate-spin" />
            ) : (
              <FileDown />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate PDF'}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
