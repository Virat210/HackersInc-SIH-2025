#!/usr/bin/env python
# coding: utf-8

# In[22]:


import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, mean_squared_error, r2_score
from sklearn.metrics import classification_report, confusion_matrix
from xgboost import XGBRegressor, XGBClassifier
from sklearn.preprocessing import LabelEncoder
import lightgbm as lgb
import warnings
warnings.filterwarnings('ignore')


# In[23]:


import pandas as pd

# Load dataset into a single variable
crop_data = pd.read_excel('Crop Data.xlsx')

print("Crop Data Dataset Shape:", crop_data.shape)

# Preview
display(crop_data.head())


# In[24]:


# Replace infinities (from division by zero) and drop NaN
crop_data['Yield'] = crop_data['Production'] / crop_data['Area']
crop_data['Yield'].replace([float('inf'), -float('inf')], pd.NA, inplace=True)
crop_data.dropna(subset=['Yield'], inplace=True)

# Features and target
target_col = 'Yield'
y = crop_data[target_col]
X = crop_data.drop(columns=[target_col])

# Keep only numeric features
X = X.select_dtypes(include='number')

print("Final Features Shape:", X.shape)
print("Final Target Shape:", y.shape)


# In[25]:


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)


# In[26]:


unique_values = len(np.unique(y))

if np.issubdtype(y.dtype, np.number) and unique_values > 10:
    problem_type = "regression"
else:
    problem_type = "classification"

print("Detected problem type:", problem_type)


# In[27]:


if problem_type == "regression":
    # --- XGBoost Regressor ---
    model = XGBRegressor(
        n_estimators=500,
        learning_rate=0.05,
        max_depth=6,
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    print("📊 Regression Performance (XGBoost)")
    print(f"MSE: {mse:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"R² Score: {r2:.4f}")

else:
    # --- XGBoost Classifier ---
    model = XGBClassifier(
        n_estimators=500,
        learning_rate=0.05,
        max_depth=6,
        use_label_encoder=False,
        eval_metric='mlogloss',
        random_state=42,
        n_jobs=-1
    )
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')

    print("📊 Classification Performance (XGBoost)")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Weighted Precision: {precision:.4f}")

    display(pd.DataFrame(classification_report(y_test, y_pred, output_dict=True)).T)

    # Confusion Matrix
    plt.figure(figsize=(6, 5))
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title("Confusion Matrix")
    plt.show()


# In[28]:


if problem_type == "regression":
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    print("📊 Regression Performance")
    print(f"MSE: {mse:.4f}")
    print(f"RMSE: {rmse:.4f}")
    print(f"R² Score: {r2:.4f}")

else:
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')

    print("📊 Classification Performance")
    print(f"Accuracy: {accuracy:.4f}")
    print(f"Weighted Precision: {precision:.4f}")

    display(pd.DataFrame(classification_report(y_test, y_pred, output_dict=True)).T)

    # Confusion Matrix
    plt.figure(figsize=(6, 5))
    cm = confusion_matrix(y_test, y_pred)
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title("Confusion Matrix")
    plt.show()


# In[29]:


feature_importance = pd.DataFrame({
    'Feature': X.columns,
    'Importance': model.feature_importances_
}).sort_values('Importance', ascending=False)

display(feature_importance.head(10))

# Plot
plt.figure(figsize=(8, 6))
sns.barplot(x="Importance", y="Feature", data=feature_importance.head(10))
plt.title("Top 10 Important Features")
plt.show()


# In[30]:


# 1️⃣ Encode categorical features if any
categorical_features = X_train.select_dtypes(include='object').columns.tolist()
label_encoders = {}
for col in categorical_features:
    le = LabelEncoder()
    X_train[col] = le.fit_transform(X_train[col].astype(str))
    X_test[col] = le.transform(X_test[col].astype(str))
    label_encoders[col] = le

# 2️⃣ Initialize LightGBM Regressor
lgb_model = lgb.LGBMRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=-1,
    random_state=42
)

# 3️⃣ Train the model
lgb_model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric='rmse',
    callbacks=[lgb.early_stopping(stopping_rounds=100)]

)

# 4️⃣ Predict and evaluate
y_pred = lgb_model.predict(X_test)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("📊 LightGBM Regression Performance")
print(f"RMSE: {rmse:.4f}")
print(f"R² Score: {r2:.4f}")

# 5️⃣ Optional: Feature importance
lgb.plot_importance(lgb_model, max_num_features=10, importance_type='gain', figsize=(8,6))
plt.title("Top 10 Feature Importances")
plt.show()


# In[34]:


import pickle

# Assuming you have a model or data you want to save
model = RandomForestRegressor(n_estimators=100, random_state=42) # your model or data

with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)






# In[ ]:



