import LayoutSuggester from "@/components/layout-ai/layout-suggester";

export default function LayoutAIPage() {
    return (
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl">
                 <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight">
                    Layout AI Assistant
                </h1>
                <p className="mb-6 text-muted-foreground">
                    Let our AI suggest optimal layout adjustments for your content.
                </p>
                <LayoutSuggester />
            </div>
        </main>
    )
}
