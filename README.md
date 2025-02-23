# Online Fraud Detection via Quantum Annealing & Machine Learning

## Overview
This project integrates **Quantum Annealing Solvers** with **Machine Learning** to enhance online fraud detection accuracy. By leveraging **quantum computing** and **AI models**, the system aims to **reduce false positives** and improve fraud detection efficiency.

## Features
- **Hybrid Approach:** Combines **Quantum Annealing** with **Machine Learning** for fraud detection.
- **High Accuracy:** Achieved **95% detection accuracy**, reducing false positives by **20%**.
- **Cloud Deployment:** Utilizes **AWS Lambda** for scalable processing.
- **Data Processing:** Efficient fraud pattern detection using **Pandas** and **NumPy**.

## Tech Stack
- **Programming Languages:** Python
- **Libraries:** Pandas, NumPy, Scikit-learn
- **Cloud Services:** AWS Lambda
- **Quantum Computing:** D-Wave Quantum Annealing
- **Database:** MySQL

## Installation
```bash
# Clone the repository
git clone https://github.com/your-repo/online-fraud-detection.git
cd online-fraud-detection

# Install dependencies
pip install -r requirements.txt
```

## Usage
1. **Prepare Dataset:** Place transaction data in `data/transactions.csv`.
2. **Run Model:** Execute `fraud_detection.py` to train and test the model.
3. **Deploy on AWS:** Use `aws_deploy.sh` for Lambda deployment.

## Results
- **Detection Accuracy:** 95%
- **False Positives Reduced By:** 20%

## Future Improvements
- Expand dataset for better fraud pattern recognition.
- Optimize Quantum Annealing parameters for faster processing.
- Implement real-time fraud detection API.

## Contributors
- **Chintha Venu Gopal** (Developer & Researcher)

## License
This project is licensed under the **MIT License**.
