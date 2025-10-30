import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type AnalysisCardProps = {
  analysisResults: {
    allCaps: number;
    noPunctuation: number;
    isValid: boolean;
  };
};

export function AnalysisCard({ analysisResults }: AnalysisCardProps) {
  const { allCaps, noPunctuation, isValid } = analysisResults;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Document Analysis</CardTitle>
        <CardDescription>
          Structural & formatting inconsistencies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {allCaps > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>All Caps Paragraphs</AlertTitle>
            <AlertDescription>
              {allCaps} paragraphs found in all caps. This can affect
              readability.
            </AlertDescription>
          </Alert>
        )}
        {noPunctuation > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Incorrect Paragraph Breaks</AlertTitle>
            <AlertDescription>
              {noPunctuation} lines end without punctuation, suggesting incorrect
              breaks.
            </AlertDescription>
          </Alert>
        )}
        {isValid && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Structure OK</AlertTitle>
            <AlertDescription>
              Document structure seems valid. Ready for formatting.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
