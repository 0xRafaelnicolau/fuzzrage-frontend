import { ChartBarInteractive } from "@/components/ui/charts/bar-chart";
import { ChartRadialShape } from "@/components/ui/charts/radial-chart";

export default function Page() {
    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                {/* Three radial charts side by side */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ChartRadialShape />
                    <ChartRadialShape />
                    <ChartRadialShape />
                </div>

                {/* Bar chart spanning full width */}
                <div className="w-full">
                    <ChartBarInteractive />
                </div>
            </div>
        </main>
    )
}