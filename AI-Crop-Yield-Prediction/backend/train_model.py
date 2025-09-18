# After loading crop_data and creating Yield column
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

# Features and target
target_col = "Yield"
y = crop_data[target_col]

# Select features
feature_cols = ["State_Name", "District_Name", "Season", "Crop", "Area"]
X = crop_data[feature_cols]

# Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Categorical + numeric split
categorical_cols = ["State_Name", "District_Name", "Season", "Crop"]
numeric_cols = ["Area"]

# Encoder
encoder = OneHotEncoder(handle_unknown="ignore", sparse_output=False)

# Preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", encoder, categorical_cols),
        ("num", "passthrough", numeric_cols),
    ]
)

# Model pipeline
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(n_estimators=200, random_state=42))
])

# Train
model.fit(X_train, y_train)

# Save pipeline
import joblib
joblib.dump(model, "models/crop_yield_pipeline.pkl")

print("✅ Model trained & saved with categorical + numeric features")
