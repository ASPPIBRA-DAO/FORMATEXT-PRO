'use client';

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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '../ui/separator';
import { Switch } from '../ui/switch';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { StyleSettings } from '@/lib/pdf-utils';

interface SettingsCardProps {
  styles: StyleSettings;
  setStyles: (styles: StyleSettings) => void;
}

export function SettingsCard({ styles, setStyles }: SettingsCardProps) {

  const handleStyleChange = (key: keyof StyleSettings, value: any) => {
    setStyles({ ...styles, [key]: value });
  };

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
          {/* Text & Font Settings */}
          <TabsContent value="text" className="pt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select 
                    value={styles.fontFamily}
                    onValueChange={(value) => handleStyleChange('fontFamily', value)}
                  >
                    <SelectTrigger id="font-family">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Literata">Literata</SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-size">Font Size (pt)</Label>
                  <Input 
                    id="font-size" 
                    type="number" 
                    value={styles.fontSize}
                    onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Text Alignment</Label>
                <ToggleGroup 
                  type="single" 
                  defaultValue={styles.textAlign} 
                  className="flex flex-wrap justify-start gap-2"
                  onValueChange={(value) => handleStyleChange('textAlign', value)}
                >
                    <ToggleGroupItem value="left" aria-label="Align left"><AlignLeft className="h-5 w-5" /></ToggleGroupItem>
                    <ToggleGroupItem value="center" aria-label="Align center"><AlignCenter className="h-5 w-5" /></ToggleGroupItem>
                    <ToggleGroupItem value="right" aria-label="Align right"><AlignRight className="h-5 w-5" /></ToggleGroupItem>
                    <ToggleGroupItem value="justify" aria-label="Align justify"><AlignJustify className="h-5 w-5" /></ToggleGroupItem>
                </ToggleGroup>
              </div>
              <Separator />
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="spacing-before">Spacing Before (pt)</Label>
                  <Input 
                    id="spacing-before" 
                    type="number" 
                    value={styles.spacingBefore}
                    onChange={(e) => handleStyleChange('spacingBefore', parseInt(e.target.value, 10))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spacing-after">Spacing After (pt)</Label>
                  <Input 
                    id="spacing-after" 
                    type="number" 
                    value={styles.spacingAfter}
                    onChange={(e) => handleStyleChange('spacingAfter', parseInt(e.target.value, 10))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          {/* Page Layout Settings */}
          <TabsContent value="layout" className="pt-4">
             <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="page-size">Page Size</Label>
                  <Select 
                    value={styles.pageSize}
                    onValueChange={(value) => handleStyleChange('pageSize', value)}
                  >
                    <SelectTrigger id="page-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-4">
                    <Label>Margins (pt)</Label>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                         <div className="space-y-2">
                            <Label htmlFor="margin-top" className="text-sm text-muted-foreground">Top</Label>
                            <Input id="margin-top" type="number" value={styles.marginTop} onChange={(e) => handleStyleChange('marginTop', parseInt(e.target.value, 10))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-bottom" className="text-sm text-muted-foreground">Bottom</Label>
                            <Input id="margin-bottom" type="number" value={styles.marginBottom} onChange={(e) => handleStyleChange('marginBottom', parseInt(e.target.value, 10))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-left" className="text-sm text-muted-foreground">Left</Label>
                            <Input id="margin-left" type="number" value={styles.marginLeft} onChange={(e) => handleStyleChange('marginLeft', parseInt(e.target.value, 10))} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="margin-right" className="text-sm text-muted-foreground">Right</Label>
                            <Input id="margin-right" type="number" value={styles.marginRight} onChange={(e) => handleStyleChange('marginRight', parseInt(e.target.value, 10))} />
                        </div>
                    </div>
                </div>
            </div>
          </TabsContent>
          {/* Table of Contents Settings */}
          <TabsContent value="toc" className="pt-4">
            <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label htmlFor="toc-switch" className="text-base">Automatic Table of Contents</Label>
                        <p className="text-sm text-muted-foreground">
                        Automatically generate a ToC from titles and chapters.
                        </p>
                    </div>
                    <Switch 
                      id="toc-switch" 
                      checked={styles.includeToc}
                      onCheckedChange={(checked) => handleStyleChange('includeToc', checked)}
                    />
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
