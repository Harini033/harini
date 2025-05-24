# crop_predictor.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib

# Sample dataset (you can expand this with real data)
data = pd.read_csv("crop_data.csv")

X = data.drop('label', axis=1)  # N, P, K, temperature, humidity, pH, rainfall
y = data['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(n_estimators=100)
clf.fit(X_train, y_train)

predictions = clf.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))

joblib.dump(clf, 'crop_model.pkl')
