"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PerformanceMetrics } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const performanceData: PerformanceMetrics[] = [
  {
    model: "Traditional ML",
    accuracy: 75,
    precision: 72,
    recall: 68,
    f1Score: 70,
    falsePositiveRate: 28,
  },
  {
    model: "Quantum-Enhanced ML",
    accuracy: 95,
    precision: 94,
    recall: 93,
    f1Score: 93.5,
    falsePositiveRate: 8,
  },
]

const timeSeriesData = [
  { month: "Jan", traditionalFalsePositives: 28, quantumFalsePositives: 12 },
  { month: "Feb", traditionalFalsePositives: 27, quantumFalsePositives: 10 },
  { month: "Mar", traditionalFalsePositives: 29, quantumFalsePositives: 9 },
  { month: "Apr", traditionalFalsePositives: 26, quantumFalsePositives: 8 },
  { month: "May", traditionalFalsePositives: 30, quantumFalsePositives: 8 },
  { month: "Jun", traditionalFalsePositives: 28, quantumFalsePositives: 7 },
]

export function ModelPerformance() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Model Performance Comparison</CardTitle>
          <CardDescription>Comparing traditional ML with quantum-enhanced fraud detection</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="metrics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
              <TabsTrigger value="falsePositives">False Positive Reduction</TabsTrigger>
            </TabsList>
            <TabsContent value="metrics" className="mt-4">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="accuracy" name="Accuracy (%)" fill="#8884d8" />
                    <Bar dataKey="precision" name="Precision (%)" fill="#82ca9d" />
                    <Bar dataKey="recall" name="Recall (%)" fill="#ffc658" />
                    <Bar dataKey="f1Score" name="F1 Score" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="falsePositives" className="mt-4">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="traditionalFalsePositives"
                      name="Traditional ML False Positives (%)"
                      stroke="#ff8042"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="quantumFalsePositives"
                      name="Quantum-Enhanced False Positives (%)"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Achievements</CardTitle>
            <CardDescription>Performance improvements with quantum annealing</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                  ✓
                </div>
                <div>
                  <p className="font-medium">95% Detection Accuracy</p>
                  <p className="text-sm text-muted-foreground">20% improvement over traditional ML models</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                  ✓
                </div>
                <div>
                  <p className="font-medium">Reduced False Positives by 20%</p>
                  <p className="text-sm text-muted-foreground">Fewer legitimate transactions flagged as fraudulent</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="mr-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">
                  ✓
                </div>
                <div>
                  <p className="font-medium">Improved F1 Score to 93.5</p>
                  <p className="text-sm text-muted-foreground">Better balance between precision and recall</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Efficiency</CardTitle>
            <CardDescription>Quantum vs. classical processing comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Complex Pattern Recognition</span>
                  <span className="text-sm font-medium">85% faster</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Feature Optimization</span>
                  <span className="text-sm font-medium">72% faster</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Decision Boundary Calculation</span>
                  <span className="text-sm font-medium">68% faster</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

