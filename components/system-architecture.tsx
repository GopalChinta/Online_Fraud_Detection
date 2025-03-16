"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CloudLightning, Database, Cpu } from "lucide-react"
import Mermaid from "@/components/ui/mermaid"

// Add this at the top of the file, after the imports
// Note: In a real project, you would add mermaid to your package.json
// npm install mermaid

export function SystemArchitecture() {
  const mermaidDiagram = `
graph TD
    User(["User/Client"]) -->|Submit Transaction| Frontend["Frontend Dashboard"]
    Frontend -->|API Request| APIGateway["API Gateway"]
    APIGateway -->|Invoke| Lambda["AWS Lambda"]
    
    subgraph "Fraud Detection System"
        Lambda -->|Process Transaction| Preprocessor["Data Preprocessor"]
        Preprocessor -->|Extract Features| ClassicalML["Classical ML Models"]
        Preprocessor -->|Complex Cases| QuantumSolver["D-Wave Quantum Solver"]
        
        ClassicalML -->|Initial Screening| ResultCombiner["Result Combiner"]
        QuantumSolver -->|Quantum Analysis| ResultCombiner
        ResultCombiner -->|Final Decision| FraudResult["Fraud Detection Result"]
    end
    
    Lambda -->|Store Data| Database["MySQL Database"]
    Database -->|Historical Data| ClassicalML
    
    FraudResult -->|Return Result| Lambda
    Lambda -->|API Response| APIGateway
    APIGateway -->|Display Result| Frontend
    
    subgraph "AWS Cloud"
        APIGateway
        Lambda
        Database
    end
    
    subgraph "Quantum Computing"
        QuantumSolver -->|QUBO Problem| DWave["D-Wave Quantum Computer"]
        DWave -->|Solution| QuantumSolver
    end
    
    ClassicalML -->|Features| FeatureStore["Feature Store"]
    FeatureStore -->|Optimized Features| QuantumSolver
`

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>System Architecture</CardTitle>
          <CardDescription>Hybrid quantum-classical architecture for fraud detection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="w-full max-w-4xl">
              <div className="border border-border rounded-lg p-4 bg-white dark:bg-slate-800">
                <Mermaid chart={mermaidDiagram} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
              <div className="flex flex-col items-center p-4 border rounded-lg">
                <CloudLightning className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium">AWS Lambda</h3>
                <p className="text-sm text-center text-muted-foreground">Serverless compute for scalable processing</p>
              </div>

              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Cpu className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium">D-Wave Quantum</h3>
                <p className="text-sm text-center text-muted-foreground">Quantum annealing for optimization problems</p>
              </div>

              <div className="flex flex-col items-center p-4 border rounded-lg">
                <Database className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium">MySQL Database</h3>
                <p className="text-sm text-center text-muted-foreground">Transaction data storage and retrieval</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Implementation Details</CardTitle>
            <CardDescription>Technical components of the fraud detection system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="quantum" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="quantum">Quantum</TabsTrigger>
                <TabsTrigger value="ml">ML</TabsTrigger>
                <TabsTrigger value="cloud">Cloud</TabsTrigger>
              </TabsList>
              <TabsContent value="quantum" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium">Quantum Annealing Solver</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Utilizes D-Wave's quantum annealing technology to solve complex optimization problems in fraud
                    pattern detection.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">QUBO Formulation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Converts fraud detection features into Quadratic Unconstrained Binary Optimization problems solvable
                    by quantum annealers.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Quantum-Classical Hybrid</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Combines quantum processing for optimization with classical ML for feature extraction and final
                    decision making.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="ml" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium">Feature Engineering</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Uses Pandas and NumPy for advanced feature extraction from transaction data.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Ensemble Models</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Combines multiple ML algorithms (Random Forest, XGBoost, Neural Networks) with quantum optimization.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Scikit-learn Integration</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Leverages scikit-learn for model training, validation, and hyperparameter tuning.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="cloud" className="mt-4 space-y-4">
                <div>
                  <h3 className="font-medium">AWS Lambda Functions</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Serverless architecture for on-demand fraud detection processing with automatic scaling.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">API Gateway</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    RESTful API interface for transaction submission and fraud detection results.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">MySQL Database</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Stores transaction data, fraud patterns, and detection results for analysis and auditing.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Technologies used in the fraud detection system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                  >
                    Python
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Libraries & Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    Pandas
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    NumPy
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    Scikit-learn
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    D-Wave Ocean SDK
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                  >
                    TensorFlow
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Cloud Services</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                  >
                    AWS Lambda
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                  >
                    AWS API Gateway
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800"
                  >
                    AWS CloudWatch
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Quantum Computing</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                  >
                    D-Wave Quantum Annealer
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800"
                  >
                    QUBO Problem Formulation
                  </Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Database</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                  >
                    MySQL
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

