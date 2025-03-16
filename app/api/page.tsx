import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FraudDetectionDashboard } from "@/components/fraud-detection-dashboard"
import { ModelPerformance } from "@/components/model-performance"
import { SystemArchitecture } from "@/components/system-architecture"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col gap-4 md:gap-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Quantum-Enhanced Fraud Detection</h1>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-4">
            <FraudDetectionDashboard />
          </TabsContent>
          <TabsContent value="performance" className="mt-4">
            <ModelPerformance />
          </TabsContent>
          <TabsContent value="architecture" className="mt-4">
            <SystemArchitecture />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
