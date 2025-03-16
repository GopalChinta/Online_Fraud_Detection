# This file demonstrates how to deploy the quantum fraud detection system to AWS Lambda
# using the AWS CDK (Cloud Development Kit)

import aws_cdk as cdk
from aws_cdk import (
    aws_lambda as lambda_,
    aws_apigateway as apigateway,
    aws_logs as logs,
    aws_iam as iam,
    aws_dynamodb as dynamodb
)
from constructs import Construct

class QuantumFraudDetectionStack(cdk.Stack):
    def __init__(self, scope: Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)
        
        # Create a DynamoDB table for storing transaction data and results
        transaction_table = dynamodb.Table(
            self, "TransactionTable",
            partition_key=dynamodb.Attribute(
                name="transactionId",
                type=dynamodb.AttributeType.STRING
            ),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=cdk.RemovalPolicy.DESTROY  # For demo only, use RETAIN in production
        )
        
        # Create the Lambda function for fraud detection
        fraud_detection_lambda = lambda_.Function(
            self, "FraudDetectionFunction",
            runtime=lambda_.Runtime.PYTHON_3_9,
            code=lambda_.Code.from_asset("lambda"),
            handler="handler.lambda_handler",
            memory_size=1024,
            timeout=cdk.Duration.seconds(30),
            environment={
                "TRANSACTION_TABLE": transaction_table.table_name,
                # Add D-Wave API token as environment variable (in production, use AWS Secrets Manager)
                "DWAVE_API_TOKEN": "your-dwave-api-token"
            },
            log_retention=logs.RetentionDays.ONE_WEEK
        )
        
        # Grant the Lambda function read/write access to the DynamoDB table
        transaction_table.grant_read_write_data(fraud_detection_lambda)
        
        # Create an API Gateway to expose the Lambda function
        api = apigateway.RestApi(
            self, "FraudDetectionApi",
            rest_api_name="Quantum Fraud Detection API",
            description="API for quantum-enhanced fraud detection"
        )
        
        # Create an API Gateway resource and method
        detect_resource = api.root.add_resource("detect")
        detect_integration = apigateway.LambdaIntegration(fraud_detection_lambda)
        detect_resource.add_method("POST", detect_integration)
        
        # Output the API Gateway URL
        cdk.CfnOutput(
            self, "ApiUrl",
            value=f"{api.url}detect",
            description="URL for the fraud detection API"
        )

# Example AWS CDK app
app = cdk.App()
QuantumFraudDetectionStack(app, "QuantumFraudDetectionStack")
app.synth()

