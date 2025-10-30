"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getLayoutSuggestions } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <BrainCircuit className="mr-2 h-4 w-4" />
          Get Suggestions
        </>
      )}
    </Button>
  );
}

export default function LayoutSuggester() {
  const [state, formAction] = useFormState(getLayoutSuggestions, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle className="font-headline text-xl">
            Content & Requirements
          </CardTitle>
          <CardDescription>
            Paste a sample of your document and describe the desired formatting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full gap-2">
            <Label htmlFor="documentContent">Document Content</Label>
            <Textarea
              id="documentContent"
              name="documentContent"
              placeholder="e.g., Chapter 1: The Beginning..."
              rows={8}
              required
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="formattingRequirements">
              Formatting Requirements
            </Label>
            <Textarea
              id="formattingRequirements"
              name="formattingRequirements"
              placeholder="e.g., Standard A4 page, professional margins for a report."
              rows={3}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>

      {state.data && (
        <div className="m-6 border-t pt-6">
          <h3 className="mb-4 font-headline text-lg font-semibold">
            AI Suggestions
          </h3>
          <div className="space-y-4">
            <Alert>
              <AlertTitle className="font-semibold">Suggested Adjustments</AlertTitle>
              <AlertDescription>
                {state.data.suggestedAdjustments}
              </AlertDescription>
            </Alert>
             <Alert variant="default">
              <AlertTitle className="font-semibold">Reasoning</AlertTitle>
              <AlertDescription>
                {state.data.reasoning}
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </Card>
  );
}
