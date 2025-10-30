import { AnalysisCard } from '@/components/dashboard/analysis-card';
import { GenerateCard } from '@/components/dashboard/generate-card';
import { SettingsCard } from '@/components/dashboard/settings-card';
import { UploadCard } from '@/components/dashboard/upload-card';

export default function Home() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 font-headline text-3xl font-bold tracking-tight">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-1">
            <UploadCard />
            <AnalysisCard
              analysisResults={{
                allCaps: 12,
                noPunctuation: 45,
                isValid: true,
              }}
            />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <SettingsCard />
            <GenerateCard />
          </div>
        </div>
      </div>
    </main>
  );
}
