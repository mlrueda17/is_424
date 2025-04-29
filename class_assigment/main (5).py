import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

# Feature Engineering Function
def process_logs(logs):
    # Extract total time spent by each user
    total_time = logs.groupby('user_id')['seconds'].sum().reset_index()
    total_time.columns = ['user_id', 'total_time']
    
    # Extract time spent on specific pages (e.g., laptop.html)
    laptop_time = logs[logs['url'] == '/laptop.html'].groupby('user_id')['seconds'].sum().reset_index()
    laptop_time.columns = ['user_id', 'laptop_time']
    
    # Count the number of visits per user
    visit_count = logs.groupby('user_id').size().reset_index(name='visit_count')
    
    # Count unique pages visited by each user
    unique_pages = logs.groupby('user_id')['url'].nunique().reset_index()
    unique_pages.columns = ['user_id', 'unique_pages']
    
    # Merge all features into one DataFrame
    features = total_time.merge(laptop_time, on='user_id', how='left') \
                         .merge(visit_count, on='user_id', how='left') \
                         .merge(unique_pages, on='user_id', how='left')
    features.fillna(0, inplace=True)
    
    return features

# UserPredictor Class
class UserPredictor:
    def __init__(self):
        # Create a pipeline with scaling and logistic regression
        self.pipeline = Pipeline([
            ('scaler', StandardScaler()),
            ('model', LogisticRegression(random_state=42))
        ])
        self.features = None

    def fit(self, users, logs, y):
        # Feature engineering
        logs_features = process_logs(logs)
        train_data = users.merge(logs_features, on='user_id', how='left')
        train_data.fillna(0, inplace=True)
        
        # Define features and target
        self.features = ['age', 'past_purchase_amt', 'total_time', 'laptop_time', 'visit_count', 'unique_pages']
        X = train_data[self.features]
        y = y['y']
        
        # Fit the pipeline
        self.pipeline.fit(X, y)
    
    def predict(self, users, logs):
        # Feature engineering
        logs_features = process_logs(logs)
        test_data = users.merge(logs_features, on='user_id', how='left')
        test_data.fillna(0, inplace=True)
        
        # Predict using the trained pipeline
        X = test_data[self.features]
        return self.pipeline.predict(X)
