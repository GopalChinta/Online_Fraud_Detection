"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { detectFraud } from "@/lib/fraud-detection"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function FraudDetectionDashboard() {
  const [transactionData, setTransactionData] = useState({
    amount: "1250.00",
    merchantId: "MERCH-8765",
    customerId: "CUST-1234",
    location: "New York, USA",
    deviceId: "DEV-5678",
    ipAddress: "192.168.1.1",
    timestamp: new Date().toISOString(),
  })

  const [result, setResult] = useState<null | {
    isFraudulent: boolean
    confidence: number
    processingTime: number
    quantumContribution: number
  }>(null)

  const [isProcessing, setIsProcessing] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransactionData({
      ...transactionData,
      [e.target.name]: e.target.value,
    })
  }

  const handleDetect = async () => {
    setIsProcessing(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const detectionResult = await detectFraud(transactionData)
      setResult(detectionResult)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Transaction Analysis</CardTitle>
          <CardDescription>Enter transaction details to analyze for potential fraud</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Transaction Amount</Label>
              <Input id="amount" name="amount" value={transactionData.amount} onChange={handleInputChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="merchantId">Merchant ID</Label>
              <Input
                id="merchantId"
                name="merchantId"
                value={transactionData.merchantId}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="customerId">Customer ID</Label>
              <Input
                id="customerId"
                name="customerId"
                value={transactionData.customerId}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={transactionData.location} onChange={handleInputChange} />
            </div>
            <Button onClick={handleDetect} disabled={isProcessing} type="button" className="mt-2">
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Analyze Transaction"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detection Results</CardTitle>
          <CardDescription>Quantum-enhanced fraud detection analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <RefreshCw className="h-12 w-12 animate-spin text-primary" />
              <p className="text-center text-muted-foreground">
                Processing transaction with quantum annealing solver...
              </p>
              <Progress value={45} className="w-full" />
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                {result.isFraudulent ? (
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-16 w-16 text-destructive" />
                    <Badge variant="destructive" className="text-lg py-1 px-3">
                      Fraudulent Transaction
                    </Badge>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                    <Badge variant="outline" className="text-lg py-1 px-3 border-green-500 text-green-500">
                      Legitimate Transaction
                    </Badge>
                  </div>
                )}
              </div>

              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-sm font-medium">Confidence Score</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={result.confidence} className="h-2" />
                    <span className="text-sm">{result.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Quantum Contribution</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={result.quantumContribution} className="h-2" />
                    <span className="text-sm">{result.quantumContribution}%</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium">Processing Time</p>
                  <p className="text-sm text-muted-foreground">{result.processingTime} ms</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <p>Enter transaction details and click "Analyze Transaction" to detect potential fraud</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

