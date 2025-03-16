# This file demonstrates how to integrate classical machine learning with quantum annealing
# for a hybrid fraud detection approach

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

class HybridFraudDetector:
    def __init__(self):
        """
        Initialize the hybrid fraud detector that combines classical ML with quantum annealing
        """
        # Classical ML models
        self.random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
        self.gradient_boosting = GradientBoostingClassifier(random_state=42)
        self.neural_network = MLPClassifier(hidden_layer_sizes=(100, 50), random_state=42)
        
        # Feature scaler
        self.scaler = StandardScaler()
        
        # Quantum annealing solver
        from quantum_annealing_solver import QuantumFraudDetector
        self.quantum_detector = QuantumFraudDetector(use_real_quantum=False)
        
        # Model weights for ensemble
        self.model_weights = {
            'random_forest': 0.3,
            'gradient_boosting': 0.2,
            'neural_network': 0.2,
            'quantum': 0.3
        }
    
    def train(self, training_data_path):
        """
        Train the classical ML models on historical transaction data
        
        Parameters:
        -----------
        training_data_path : str
            Path to the CSV file containing training data
        """
        # Load training data
        data = pd.read_csv(training_data_path)
        
        # Extract features and target
        X = data.drop(['transaction_id', 'is_fraudulent'], axis=1)
        y = data['is_fraudulent']
        
        # Split into training and validation sets
        X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_val_scaled = self.scaler.transform(X_val)
        
        # Train classical ML models
        self.random_forest.fit(X_train_scaled, y_train)
        self.gradient_boosting.fit(X_train_scaled, y_train)
        self.neural_network.fit(X_train_scaled, y_train)
        
        # Evaluate models
        rf_pred = self.random_forest.predict(X_val_scaled)
        gb_pred = self.gradient_boosting.predict(X_val_scaled)
        nn_pred = self.neural_network.predict(X_val_scaled)
        
        print("Model Performance:")
        print(f"Random Forest - Accuracy: {accuracy_score(y_val, rf_pred):.4f}, F1: {f1_score(y_val, rf_pred):.4f}")
        print(f"Gradient Boosting - Accuracy: {accuracy_score(y_val, gb_pred):.4f}, F1: {f1_score(y_val, gb_pred):.4f}")
        print(f"Neural Network - Accuracy: {accuracy_score(y_val, nn_pred):.4f}, F1: {f1_score(y_val, nn_pred):.4f}")
    
    def detect_fraud(self, transaction_data):
        """
        Detect fraud using the hybrid approach
        
        Parameters:
        -----------
        transaction_data : dict
            Raw transaction data
            
        Returns:
        --------
        dict
            Fraud detection result
        """
        # Convert transaction data to feature vector
        features = self._extract_features(transaction_data)
        features_scaled = self.scaler.transform([features])
        
        # Get predictions from classical ML models
        rf_prob = self.random_forest.predict_proba(features_scaled)[0, 1]
        gb_prob = self.gradient_boosting.predict_proba(features_scaled)[0, 1]
        nn_prob = self.neural_network.predict_proba(features_scaled)[0, 1]
        
        # Get prediction from quantum annealing
        quantum_result = self.quantum_detector.detect_fraud(transaction_data)
        quantum_prob = quantum_result['confidence'] / 100
        
        # Combine predictions using weighted average
        combined_prob = (
            self.model_weights['random_forest'] * rf_prob +
            self.model_weights['gradient_boosting'] * gb_prob +
            self.model_weights['neural_network'] * nn_prob +
            self.model_weights['quantum'] * (1 if quantum_result['isFraudulent'] else 0)
        )
        
        # Determine if fraudulent based on threshold
        is_fraudulent = combined_prob > 0.5
        
        # Calculate confidence score (0-100%)
        confidence = max(combined_prob, 1 - combined_prob) * 100
        
        # Calculate quantum contribution
        quantum_contribution = self.model_weights['quantum'] * 100
        
        # Return the detection result
        return {
            'isFraudulent': bool(is_fraudulent),
            'confidence': float(confidence),
            'processingTime': float(quantum_result['processingTime']),
            'quantumContribution': float(quantum_contribution)
        }
    
    def _extract_features(self, transaction_data):
        """
        Extract features from transaction data for classical ML models
        
        Parameters:
        -----------
        transaction_data : dict
            Raw transaction data
            
        Returns:
        --------
        list
            Feature vector
        """
        # In a real implementation, this would extract and transform features
        # For demo, return a simplified feature vector
        return [
            float(transaction_data['amount']),
            self._hash_to_float(transaction_data['merchantId']),
            self._hash_to_float(transaction_data['customerId']),
            self._location_to_float(transaction_data['location']),
            self._hash_to_float(transaction_data['deviceId']),
            self._ip_to_float(transaction_data['ipAddress']),
            self._timestamp_to_hour(transaction_data['timestamp'])
        ]
    
    # Helper methods for feature extraction
    def _hash_to_float(self, text):
        # Convert string to float between 0 and 1
        return sum(ord(c) for c in text) % 1000 / 1000
    
    def _location_to_float(self, location):
        # Convert location to float between 0 and 1
        return sum(ord(c) for c in location) % 1000 / 1000
    
    def _ip_to_float(self, ip):
        # Convert IP address to float between 0 and 1
        return sum(int(part) for part in ip.split('.')) / 1000
    
    def _timestamp_to_hour(self, timestamp):
        # Extract hour from timestamp
        try:
            return pd.Timestamp(timestamp).hour / 24
        except:
            return 0.5

# Example usage
if __name__ == "__main__":
    # Initialize the hybrid fraud detector
    detector = HybridFraudDetector()
    
    # Train the model (in a real implementation)
    # detector.train("historical_transactions.csv")
    
    # Example transaction
    transaction = {
        'amount': '1250.00',
        'merchantId': 'MERCH-8765',
        'customerId': 'CUST-1234',
        'location': 'New York, USA',
        'deviceId': 'DEV-5678',
        'ipAddress': '192.168.1.1',
        'timestamp': '2023-03-15T14:30:00Z'
    }
    
    # Detect fraud
    result = detector.detect_fraud(transaction)
    
    # Print the result
    print("Hybrid Fraud Detection Result:")
    print(f"Is Fraudulent: {result['isFraudulent']}")
    print(f"Confidence: {result['confidence']:.2f}%")
    print(f"Processing Time: {result['processingTime']:.2f} ms")
    print(f"Quantum Contribution: {result['quantumContribution']}%")

