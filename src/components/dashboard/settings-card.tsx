"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';

export function SettingsCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">2. Configure Styles</CardTitle>
        <CardDescription>
          Define your style rules once, and we'll apply them with surgical
          precision.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="text">Text & Font</TabsTrigger>
            <TabsTrigger value="layout">Page Layout</TabsTrigger>
            <TabsTrigger value="toc">Contents</TabsTrigger>
          </TabsList>
          <TabsContent value="text" className="pt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select defaultValue="inter">
                    <SelectTrigger id="font-family">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inter">Inter</SelectItem>
                      <SelectItem value="literata">Literata</SelectItem>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size (pt)</Label>
                  <Input id="font-size" type="number" defaultValue="12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <RadioGroup defaultValue="justify" className="flex flex-wrap gap-2">
                    <Label htmlFor="align-left" className="flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent">
                        <RadioGroupItem value="left" id="align-left" className="sr-only" />
                        <AlignLeft className="h-5 w-5" />
                    </Label>
                    <Label htmlFor="align-center" className="flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent">
                        <RadioGroupItem value="center" id="align-center" className="sr-only" />
                        <AlignCenter className="h-5 w-5" />
                    </Label>
                    <Label htmlFor="align-right" className="flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent">
                        <RadioGroupItem value="right" id="align-right" className="sr-only" />
                        <AlignRight className="h-5 w-5" />
                    </Label>
                    <Label htmlFor="align-justify" className="flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-accent">
                        <RadioGroupItem value="justify" id="align-justify" className="sr-only" />
                        <AlignJustify className="h-5 w-5" />
                    </Label>
                </RadioGroup>
              </div>
              <Separator />
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="spacing-before">Spacing Before (pt)</Label>
                  <Input id="spacing-before" type="number" defaultValue="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spacing-after">Spacing After (pt)</Label>
                  <Input id="spacing-after" type="number" defaultValue="8" />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="layout" className="pt-4">
             <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="page-size">Page Size</Label>
                  <Select defaultValue="a4">
                    <SelectTrigger id="page-size">
                      <SelectValue placeholder="Select page size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-4">
                    <Label>Margins (cm)</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                         <div className="space-y-2">
                            <Label htmlFor="margin-top" className="text-sm text-muted-foreground">Top</Label>
                            <Input id="margin-top" type="number" defaultValue="3" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-bottom" className="text-sm text-muted-foreground">Bottom</Label>
                            <Input id="margin-bottom" type="number" defaultValue="2" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-left" className="text-sm text-muted-foreground">Left</Label>
                            <Input id="margin-left" type="number" defaultValue="3" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-right" className="text-sm text-muted-foreground">Right</Label>
                            <Input id="margin-right" type="number" defaultValue="2" />
                        </div>
                    </div>
                </div>
            </div>
          </TabsContent>
          <TabsContent value="toc" className="pt-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="toc-switch" className="text-base">Automatic Table of Contents</Label>
                        <p className="text-sm text-muted-foreground">
                        Automatically generate a ToC from titles and chapters.
                        </p>
                    </div>
                    <Switch id="toc-switch" defaultChecked />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
