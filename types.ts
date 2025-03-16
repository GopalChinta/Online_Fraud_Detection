export interface TransactionData {
  amount: string
  merchantId: string
  customerId: string
  location: string
  deviceId: string
  ipAddress: string
  timestamp: string
}

export interface DetectionResult {
  isFraudulent: boolean
  confidence: number
  processingTime: number
  quantumContribution: number
}

export interface PerformanceMetrics {
  model: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  falsePositiveRate: number
}

