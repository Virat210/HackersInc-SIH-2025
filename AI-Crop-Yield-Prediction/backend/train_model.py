# backend/train_model.py

import os
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score

# Paths
DATA_PATH = "data/Sample_Data.csv"
MODEL_PATH = "models/crop_model.joblib"

# Ensure models folder exists
os.makedirs("models", exist_ok=True)

def train_and_save():
    # Load dataset
    df = pd.read_csv(DATA_PATH)
    print("Loaded dataset:", df.shape)
    print("Columns:", df.columns.tolist())

    # Features and target
    feature_cols = ["State_Name", "District_Name", "Crop_Year", "Season", "Crop", "Area"]
    target_col = "Production"

    X = df[feature_cols].copy()
    y = df[target_col]

    # Encode categorical columns
    encoders = {}
    for col in ["State_Name", "District_Name", "Season", "Crop"]:
        le = LabelEncoder()
        X[col] = le.fit_transform(X[col].astype(str))
        encoders[col] = le
        print(f"Encoded {col} → {len(le.classes_)} classes")

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train model
    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate
    preds = model.predict(X_test)
    rmse = mean_squared_error(y_test, preds, squared=False)
    r2 = r2_score(y_test, preds)
    print(f"Model performance: RMSE = {rmse:.2f}, R² = {r2:.3f}")

    # Save model + encoders
    joblib.dump({"model": model, "encoders": encoders}, MODEL_PATH)
    print(f"✅ Model + encoders saved to {MODEL_PATH}")

if __name__ == "__main__":
    train_and_save()
