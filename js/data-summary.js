// ProjectForge Lightweight High-Speed Catalog Index
// 450 Verified Working Projects across 9 Domains (Full details loaded on-demand)
const PROJECTS_DATA = [
  {
    "id": "ai-ml-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Spam SMS & Email Filter with Naive Bayes",
    "tagline": "Classifies spam versus ham messages with TF-IDF vectorization and Naive Bayes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Scikit-Learn",
      "NLTK",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "AI Starter",
    "rating": 4.8,
    "downloads": 4522,
    "stars": 522
  },
  {
    "id": "ai-ml-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "House Price Prediction with Linear Regression",
    "tagline": "Estimates residential property values based on square footage, rooms, and location.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Pandas",
      "Linear Regression",
      "Matplotlib"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "1st Year ML",
    "rating": 4.7,
    "downloads": 3309,
    "stars": 709
  },
  {
    "id": "ai-ml-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Iris Flower Species Classification System",
    "tagline": "Multiclass classification of iris flower morphology using KNN and Decision Trees.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Scikit-Learn",
      "Seaborn"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Classic ML",
    "rating": 4.6,
    "downloads": 3516,
    "stars": 916
  },
  {
    "id": "ai-ml-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Titanic Passenger Survival Predictor",
    "tagline": "Predicts survival probability on the Titanic using logistic regression and random forests.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Pandas",
      "Scikit-Learn"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Data Mining",
    "rating": 4.7,
    "downloads": 3541,
    "stars": 941
  },
  {
    "id": "ai-ml-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Handwritten Digit Recognition with MNIST & KNN",
    "tagline": "Identifies digits (0-9) from canvas drawings using pixel feature extraction.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "OpenCV",
      "Scikit-Learn",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Computer Vision",
    "rating": 4.9,
    "downloads": 2863,
    "stars": 963
  },
  {
    "id": "ai-ml-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Movie Review Sentiment Analyzer with VADER",
    "tagline": "Analyzes sentiment polarity of movie feedback with lexical rule-based scoring.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "NLTK",
      "VADER",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "NLP Mini",
    "rating": 4.6,
    "downloads": 2484,
    "stars": 584
  },
  {
    "id": "ai-ml-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Content-Based Movie Recommender System",
    "tagline": "Recommends movies using cosine similarity over plot genres and director keywords.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Cosine Similarity",
      "Pandas"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Recommender",
    "rating": 4.6,
    "downloads": 2880,
    "stars": 980
  },
  {
    "id": "ai-ml-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Stock Price Trend Predictor with Moving Averages",
    "tagline": "Predicts bullish/bearish trends using 50-day and 200-day simple moving averages.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Pandas",
      "Matplotlib",
      "Yahoo Finance"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "FinTech ML",
    "rating": 4.7,
    "downloads": 3617,
    "stars": 317
  },
  {
    "id": "ai-ml-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Red Wine Quality Scoring with Decision Trees",
    "tagline": "Estimates wine quality ratings based on physicochemical laboratory metrics.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Decision Trees",
      "Scikit-Learn"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Chemical ML",
    "rating": 4.8,
    "downloads": 3194,
    "stars": 594
  },
  {
    "id": "ai-ml-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Telecom Customer Churn Predictor",
    "tagline": "Identifies at-risk customers likely to cancel subscription services.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Logistic Regression",
      "Pandas"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Business ML",
    "rating": 4.9,
    "downloads": 4191,
    "stars": 891
  },
  {
    "id": "ai-ml-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Fake News Headline Detector",
    "tagline": "Classifies misinformation news articles with passive-aggressive classification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "TF-IDF",
      "PassiveAggressive",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "NLP Classifier",
    "rating": 4.7,
    "downloads": 2077,
    "stars": 877
  },
  {
    "id": "ai-ml-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Used Car Resale Price Valuation Predictor",
    "tagline": "Predicts market resale price of used vehicles based on mileage, brand, and age.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Random Forest",
      "Scikit-Learn"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Regression",
    "rating": 4.9,
    "downloads": 2867,
    "stars": 967
  },
  {
    "id": "ai-ml-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Credit Card Fraud Detection with SMOTE & XGBoost",
    "tagline": "Handles severe class imbalance to flag anomalous fraudulent financial transactions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "XGBoost",
      "SMOTE",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "FinTech Defense",
    "rating": 4.7,
    "downloads": 1669,
    "stars": 469
  },
  {
    "id": "ai-ml-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Pneumonia Detection from Chest X-Rays via CNN",
    "tagline": "Convolutional neural network for automated diagnosis of viral/bacterial pneumonia.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PyTorch",
      "CNN",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Medical AI",
    "rating": 4.7,
    "downloads": 4629,
    "stars": 629
  },
  {
    "id": "ai-ml-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Traffic Sign Recognition System with Deep CNN",
    "tagline": "Autonomous vehicle visual classifier for recognizing 43 European traffic sign types.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Autonomous Vision",
    "rating": 4.7,
    "downloads": 2105,
    "stars": 905
  },
  {
    "id": "ai-ml-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Real-Time Face Mask Detector with MobileNetV2",
    "tagline": "Live webcam face mask compliance detector with Haar cascades and lightweight CNN.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "OpenCV",
      "MobileNetV2",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Public Safety",
    "rating": 4.6,
    "downloads": 4292,
    "stars": 992
  },
  {
    "id": "ai-ml-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Twitter Brand Sentiment NLP with RoBERTa",
    "tagline": "Transformer-based fine-grained sentiment analysis of corporate customer tweets.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "HuggingFace",
      "RoBERTa",
      "Streamlit"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Transformers",
    "rating": 4.7,
    "downloads": 3125,
    "stars": 525
  },
  {
    "id": "ai-ml-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Chronic Kidney Disease Risk Prediction System",
    "tagline": "Early clinical risk stratification using ensemble machine learning classifiers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Random Forest",
      "SVM",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Healthcare ML",
    "rating": 4.9,
    "downloads": 3051,
    "stars": 451
  },
  {
    "id": "ai-ml-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Agricultural Crop Yield Prediction with Weather Data",
    "tagline": "Forecasts agricultural harvest tonnage using historical rainfall, soil, and temperature.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "LightGBM",
      "Pandas",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "AgriTech AI",
    "rating": 4.8,
    "downloads": 4274,
    "stars": 974
  },
  {
    "id": "ai-ml-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Music Genre Classification with Audio Spectrograms",
    "tagline": "Classifies musical genres (jazz, rock, hiphop) using Librosa mel-spectrograms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Librosa",
      "CNN",
      "PyTorch"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Audio AI",
    "rating": 4.9,
    "downloads": 3487,
    "stars": 887
  },
  {
    "id": "ai-ml-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Vehicle Damage Severity Assessment using ResNet50",
    "tagline": "Automates insurance claim assessment by detecting scratch, dent, and smash severity.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "ResNet50",
      "PyTorch",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Insurance AI",
    "rating": 4.7,
    "downloads": 1909,
    "stars": 709
  },
  {
    "id": "ai-ml-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Plant Leaf Disease Detection Mobile AI",
    "tagline": "Identifies 38 crop disease classes from leaf photos with MobileNet.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "TensorFlow Lite",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "AgriTech Vision",
    "rating": 4.6,
    "downloads": 2896,
    "stars": 996
  },
  {
    "id": "ai-ml-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Air Quality Index (AQI) Forecast with Multi-Output Regression",
    "tagline": "Predicts PM2.5, PM10, and NO2 pollution levels for smart cities.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "CatBoost",
      "FastAPI",
      "Pandas"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Smart City AI",
    "rating": 4.6,
    "downloads": 4944,
    "stars": 944
  },
  {
    "id": "ai-ml-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Human Activity Recognition from Smartphone Sensor Data",
    "tagline": "Classifies walking, jogging, stairs, and sitting using accelerometer 3-axis signals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "1D-CNN",
      "Keras",
      "NumPy"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Wearables AI",
    "rating": 4.7,
    "downloads": 2121,
    "stars": 921
  },
  {
    "id": "ai-ml-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Automated Breast Cancer Histopathology Diagnostic Tool",
    "tagline": "Deep learning classifier for malignant versus benign tissue biopsy slides.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PyTorch",
      "DenseNet121",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Oncology AI",
    "rating": 4.7,
    "downloads": 1877,
    "stars": 677
  },
  {
    "id": "ai-ml-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "AI MediScan: Multi-Disease Diagnosis with Grad-CAM",
    "tagline": "Medical image multi-class diagnosis with visual heatmap explainability.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "FastAPI",
      "PyTorch",
      "Grad-CAM",
      "React"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Capstone Pre-Final",
    "rating": 4.8,
    "downloads": 2562,
    "stars": 662
  },
  {
    "id": "ai-ml-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Autonomous Vehicle Lane Detection & Object Tracking (YOLOv8)",
    "tagline": "Real-time road lane segmentation and vehicle bounding-box tracking.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "YOLOv8",
      "OpenCV",
      "DeepSORT"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Autonomous Driving",
    "rating": 4.9,
    "downloads": 2799,
    "stars": 899
  },
  {
    "id": "ai-ml-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Facial Emotion Recognition & Mental Wellness Monitor",
    "tagline": "Detects micro-expressions (happy, sad, stressed, angry) from video stream.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PyTorch",
      "MediaPipe",
      "Flask"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Affective AI",
    "rating": 4.9,
    "downloads": 4951,
    "stars": 951
  },
  {
    "id": "ai-ml-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Resume Parser & Candidate ATS Ranker",
    "tagline": "Extracts candidate skills, experience, and education with Spacy NER and BERT.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Spacy",
      "Sentence-Transformers",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Enterprise HR",
    "rating": 4.8,
    "downloads": 2494,
    "stars": 594
  },
  {
    "id": "ai-ml-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Speech Emotion Recognition using Bidirectional LSTM",
    "tagline": "Identifies speaker affective state (calm, anger, fear) from voice recordings.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Librosa",
      "Bi-LSTM",
      "PyTorch"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Audio Speech",
    "rating": 4.6,
    "downloads": 4076,
    "stars": 776
  },
  {
    "id": "ai-ml-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Sign Language Gesture to Text Translator",
    "tagline": "Translates Indian/American sign language hand gestures to real-time speech.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "MediaPipe",
      "LSTM",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Assistive Tech",
    "rating": 4.8,
    "downloads": 1942,
    "stars": 742
  },
  {
    "id": "ai-ml-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Skin Cancer Melanoma Classifier with Vision Transformers",
    "tagline": "Classifies dermoscopy skin lesions using Vision Transformer (ViT) architecture.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Vision Transformers (ViT)",
      "PyTorch",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "ViT Medical",
    "rating": 4.8,
    "downloads": 3522,
    "stars": 922
  },
  {
    "id": "ai-ml-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Brain Tumor MRI Segmentation with U-Net Deep Network",
    "tagline": "Automated pixel-level segmentation of glioma and meningioma tumor boundaries.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "U-Net",
      "PyTorch",
      "SimpleITK"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Biomedical Vision",
    "rating": 4.8,
    "downloads": 3058,
    "stars": 458
  },
  {
    "id": "ai-ml-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Driver Drowsiness & Yawn Alert Warning System",
    "tagline": "Calculates Eye Aspect Ratio (EAR) and mouth opening to sound collision alarms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Dlib",
      "OpenCV",
      "Pygame"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Automotive Safety",
    "rating": 4.6,
    "downloads": 4868,
    "stars": 868
  },
  {
    "id": "ai-ml-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart CCTV Perimeter Intrusion & Anomaly Detector",
    "tagline": "Deep learning video analysis flagging unauthorized perimeter breaches.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "YOLOv8",
      "Optical Flow",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Surveillance AI",
    "rating": 4.8,
    "downloads": 1894,
    "stars": 694
  },
  {
    "id": "ai-ml-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Deforestation & Forest Canopy Satellite Segmentation",
    "tagline": "Sentinel-2 satellite multispectral segmentation tracking illegal forest logging.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Rasterio",
      "U-Net",
      "GeoPandas"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Geospatial AI",
    "rating": 4.8,
    "downloads": 4014,
    "stars": 714
  },
  {
    "id": "ai-ml-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Essay & Academic Answer Scoring Engine",
    "tagline": "Evaluates essay coherence, vocabulary, and grammar with DeBERTa embeddings.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "DeBERTa",
      "HuggingFace",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "EdTech AI",
    "rating": 4.6,
    "downloads": 4736,
    "stars": 736
  },
  {
    "id": "ai-ml-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Deepfake Video Detection with MesoNet & Spatial-Temporal CNN",
    "tagline": "Identifies AI-generated face swaps and lip-sync manipulated media.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "MesoNet",
      "PyTorch",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Cyber Forensics",
    "rating": 4.8,
    "downloads": 2474,
    "stars": 574
  },
  {
    "id": "ai-ml-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Multi-Modal Clinical AI Copilot with LLaMA-3 & RAG",
    "tagline": "Clinical decision support system integrating electronic health records and medical LLMs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "LLaMA-3",
      "LangChain",
      "Qdrant",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Major Capstone",
    "rating": 4.9,
    "downloads": 3247,
    "stars": 647
  },
  {
    "id": "ai-ml-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous Drone Navigation with Deep Reinforcement Learning",
    "tagline": "Navigates 3D obstacle courses using Proximal Policy Optimization (PPO).",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PyTorch",
      "Gymnasium",
      "AirSim",
      "ROS2"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Robotics & RL",
    "rating": 4.7,
    "downloads": 3965,
    "stars": 665
  },
  {
    "id": "ai-ml-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Edge AI Vision for Industrial Robotic Arm Sorting",
    "tagline": "High-speed automated component defect sorting using TensorRT and Jetson Nano.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "TensorRT",
      "YOLOv8",
      "Jetson Nano"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Edge Robotics",
    "rating": 4.6,
    "downloads": 3428,
    "stars": 828
  },
  {
    "id": "ai-ml-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous Quantitative Trading Bot with Deep Q-Networks",
    "tagline": "Reinforcement learning agent executing high-frequency order book trades.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Deep Q-Learning",
      "PyTorch",
      "Backtrader"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "FinTech AI",
    "rating": 4.7,
    "downloads": 3061,
    "stars": 461
  },
  {
    "id": "ai-ml-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Neural Machine Translation for Indic Regional Languages",
    "tagline": "Transformer sequence-to-sequence translator supporting Hindi, Tamil, and Telugu.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Transformers",
      "PyTorch",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Indic NLP",
    "rating": 4.6,
    "downloads": 1568,
    "stars": 368
  },
  {
    "id": "ai-ml-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "3D LiDAR Point Cloud Semantic Segmentation with PointNet++",
    "tagline": "Autonomous vehicle 3D point cloud segmentation for road boundaries and pedestrians.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PointNet++",
      "Open3D",
      "PyTorch"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "LiDAR Vision",
    "rating": 4.8,
    "downloads": 2162,
    "stars": 962
  },
  {
    "id": "ai-ml-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "AI Radiologist Automated Report Generator",
    "tagline": "Generates clinical radiology summary findings directly from multi-slice CT scans.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "BioGPT",
      "Vision-Language Models",
      "PyTorch"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Healthcare GenAI",
    "rating": 4.8,
    "downloads": 4942,
    "stars": 942
  },
  {
    "id": "ai-ml-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Real-Time Video Inpainting & Object Removal with GANs",
    "tagline": "Removes dynamic unwanted video obstacles and restores missing background textures.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "DeepFill",
      "PyTorch",
      "OpenCV"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Generative AI",
    "rating": 4.8,
    "downloads": 3474,
    "stars": 874
  },
  {
    "id": "ai-ml-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Drug Molecular Affinity Prediction with Graph Neural Networks",
    "tagline": "Predicts bioactivity and binding affinity of drug candidates against viral proteins.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "PyTorch Geometric",
      "RDKit",
      "GNN"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Bioinformatics",
    "rating": 4.9,
    "downloads": 2935,
    "stars": 335
  },
  {
    "id": "ai-ml-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "High-Voltage Powerline Defect Inspection on Aerial Drones",
    "tagline": "Identifies insulator cracks and wire corrosion from drone 4K footage.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "YOLOv8-OBB",
      "PyTorch",
      "FastAPI"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Drone AI",
    "rating": 4.6,
    "downloads": 3780,
    "stars": 480
  },
  {
    "id": "ai-ml-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Zero-Shot Medical Classification with BioCLIP",
    "tagline": "Contrastive language-image pre-training for zero-shot clinical pathology.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "BioCLIP",
      "HuggingFace",
      "PyTorch"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Multimodal AI",
    "rating": 4.9,
    "downloads": 1711,
    "stars": 511
  },
  {
    "id": "ai-ml-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous Quadruped Robot Locomotion with Reinforcement Learning",
    "tagline": "Simulates continuous terrain walking and recovery for four-legged robotic platforms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "ai-ml",
    "categoryLabel": "AI & Machine Learning",
    "techStack": [
      "Python",
      "Isaac Gym",
      "PyTorch",
      "PPO RL"
    ],
    "icon": "brain-circuit",
    "color": "#8b5cf6",
    "badge": "Robotics RL",
    "rating": 4.7,
    "downloads": 3669,
    "stars": 369
  },
  {
    "id": "iot-embedded-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Smart Home LED Automation via Bluetooth HC-05",
    "tagline": "Controls room lights and AC appliances from an Android smartphone via Bluetooth.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino C++",
      "HC-05",
      "Relay Module",
      "MIT App Inventor"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "IoT Starter",
    "rating": 4.8,
    "downloads": 4502,
    "stars": 502
  },
  {
    "id": "iot-embedded-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Temperature & Humidity Monitor with DHT11 & 16x2 LCD",
    "tagline": "Displays real-time ambient environment readings on an I2C LCD screen.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "DHT11 Sensor",
      "I2C LCD",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Sensor Kit",
    "rating": 4.9,
    "downloads": 2299,
    "stars": 399
  },
  {
    "id": "iot-embedded-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Ultrasonic Reverse Parking Distance Sensor with Buzzer",
    "tagline": "Measures vehicle reverse proximity and beeps dynamically to avoid collisions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "HC-SR04",
      "Buzzer",
      "LEDs"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Hardware Mini",
    "rating": 4.6,
    "downloads": 4264,
    "stars": 964
  },
  {
    "id": "iot-embedded-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Automatic Street Light Controller using LDR & Arduino",
    "tagline": "Saves municipal energy by auto-switching streetlights based on ambient sunlight.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "LDR Sensor",
      "Relay",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Energy Saver",
    "rating": 4.7,
    "downloads": 3773,
    "stars": 473
  },
  {
    "id": "iot-embedded-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Digital Clinical Thermometer with OLED Display",
    "tagline": "Measures body temperature accurately with DS18B20 and displays on 0.96 inch OLED.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "DS18B20",
      "OLED Display",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Health Kit",
    "rating": 4.8,
    "downloads": 4222,
    "stars": 922
  },
  {
    "id": "iot-embedded-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Overhead Water Tank Level Indicator with Alarm",
    "tagline": "Prevents rooftop water tank overflow using conductive probes and buzzer alert.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "Transistor Logic",
      "Buzzer",
      "LED Bar"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Home Utility",
    "rating": 4.7,
    "downloads": 4853,
    "stars": 853
  },
  {
    "id": "iot-embedded-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Infrared Motion Detection Security Burglar Alarm",
    "tagline": "Detects human intrusion in rooms with PIR motion sensor and sounds buzzer siren.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "PIR Motion Sensor",
      "Siren Buzzer"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Security Mini",
    "rating": 4.8,
    "downloads": 2302,
    "stars": 402
  },
  {
    "id": "iot-embedded-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Automated Soil Moisture Sensor with Micro Servo",
    "tagline": "Monitors plant moisture levels and triggers mini mechanical water gate.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "Capacitive Soil Sensor",
      "SG90 Servo"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Agri Starter",
    "rating": 4.8,
    "downloads": 2150,
    "stars": 950
  },
  {
    "id": "iot-embedded-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Digital Stopwatch & Lap Timer with 7-Segment Display",
    "tagline": "Accurate microsecond sports timer with start/stop/lap push buttons.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "4-Digit 7-Segment",
      "Interrupts",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Digital Electronics",
    "rating": 4.8,
    "downloads": 3798,
    "stars": 498
  },
  {
    "id": "iot-embedded-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Kitchen Fire & Flame Detection Alarm System",
    "tagline": "Detects infrared flame signatures and sounds fire evacuation alarms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "IR Flame Sensor",
      "Buzzer",
      "LEDs"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Safety Tech",
    "rating": 4.9,
    "downloads": 4503,
    "stars": 503
  },
  {
    "id": "iot-embedded-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Matrix Keypad Door Access Lock with EEPROM",
    "tagline": "Secures laboratory door with 4x4 keypad PIN code saved in non-volatile memory.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "4x4 Keypad",
      "EEPROM",
      "Solenoid Lock"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Access Control",
    "rating": 4.7,
    "downloads": 3337,
    "stars": 737
  },
  {
    "id": "iot-embedded-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Obstacle-Avoiding Two-Wheel Differential Mini Robot",
    "tagline": "Autonomous robot rover that navigates rooms without colliding with furniture.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "L298N Motor Driver",
      "HC-SR04",
      "DC Motors"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Robotics Starter",
    "rating": 4.8,
    "downloads": 2330,
    "stars": 430
  },
  {
    "id": "iot-embedded-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "ESP32 Web Server for Multi-Room Appliance Control",
    "tagline": "Web dashboard hosted directly on ESP32 Wi-Fi for multi-channel appliance switching.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "AsyncWebServer",
      "HTML/CSS/JS",
      "Relays"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Smart Home",
    "rating": 4.7,
    "downloads": 4729,
    "stars": 729
  },
  {
    "id": "iot-embedded-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Smart Contactless Dustbin with Ultrasonic Sensor",
    "tagline": "Auto-opens dustbin lid when hands approach and alerts when capacity is full.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP8266",
      "Servo Motor",
      "Ultrasonic Sensor",
      "ThingSpeak"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Clean City",
    "rating": 4.8,
    "downloads": 2446,
    "stars": 546
  },
  {
    "id": "iot-embedded-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "GSM Vehicle Theft Alert with GPS Live Tracking",
    "tagline": "Sends SMS coordinates with Google Maps link when unauthorized vehicle movement occurs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "SIM800L GSM",
      "NEO-6M GPS",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Automotive IoT",
    "rating": 4.8,
    "downloads": 3934,
    "stars": 634
  },
  {
    "id": "iot-embedded-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "RFID Attendance System with MySQL & Cloud Sync",
    "tagline": "Tap-and-go student smart card attendance system synced with MySQL backend.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "RC522 RFID",
      "Node.js",
      "MySQL"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Campus IoT",
    "rating": 4.8,
    "downloads": 2970,
    "stars": 370
  },
  {
    "id": "iot-embedded-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Dual-Axis Solar Panel Sun Tracker with LDRs",
    "tagline": "Optimizes photovoltaic solar efficiency by rotating solar panel toward sun rays.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Arduino",
      "2x Servo Motors",
      "4x LDRs",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Clean Energy",
    "rating": 4.8,
    "downloads": 2886,
    "stars": 986
  },
  {
    "id": "iot-embedded-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Automatic Plant Drip Irrigation with ESP8266 & Blynk",
    "tagline": "Monitors soil moisture and triggers submersible mini pump via mobile app.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP8266",
      "Soil Moisture",
      "Blynk IoT",
      "Relay"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Smart Agriculture",
    "rating": 4.6,
    "downloads": 2444,
    "stars": 544
  },
  {
    "id": "iot-embedded-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "LPG Gas Leakage Detector with MQ-6 & GSM SMS Alert",
    "tagline": "Detects butane/propane leaks in kitchens, sounds siren, and cuts solenoid gas valve.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "MQ-6 Sensor",
      "GSM Module",
      "Buzzer"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Safety IoT",
    "rating": 4.8,
    "downloads": 3882,
    "stars": 582
  },
  {
    "id": "iot-embedded-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Smart Electricity Sub-Meter with Pulse Counter & Wi-Fi",
    "tagline": "Calculates kilowatt-hour energy usage and sends monthly billing updates via Wi-Fi.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "Current Sensor ACS712",
      "ThingSpeak",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Smart Metering",
    "rating": 4.9,
    "downloads": 1527,
    "stars": 327
  },
  {
    "id": "iot-embedded-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Pulse Oximeter & SpO2 Heart Rate Monitor (MAX30102)",
    "tagline": "Measures blood oxygen saturation and pulse wave on OLED and cloud dashboard.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "MAX30102",
      "OLED",
      "Blynk Cloud"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Biomedical IoT",
    "rating": 4.8,
    "downloads": 4786,
    "stars": 786
  },
  {
    "id": "iot-embedded-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Weather Monitoring Station with ESP32 & ThingSpeak",
    "tagline": "Publishes atmospheric pressure, humidity, UV index, and rain metrics online.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "BME280",
      "UV Sensor",
      "ThingSpeak"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Climate IoT",
    "rating": 4.7,
    "downloads": 4637,
    "stars": 637
  },
  {
    "id": "iot-embedded-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Wi-Fi Controlled Video Streaming Robot Car (ESP32-CAM)",
    "tagline": "Remote surveillance car streaming live video with browser joystick controls.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-CAM",
      "L298N Driver",
      "WebSockets",
      "HTML5"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Surveillance Bot",
    "rating": 4.9,
    "downloads": 3403,
    "stars": 803
  },
  {
    "id": "iot-embedded-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Wireless Smart Notice Board with NodeMCU & Web UI",
    "tagline": "Displays urgent department notices on 16x2 LCD or P10 LED matrix via Wi-Fi.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "NodeMCU",
      "P10 LED Matrix",
      "WebSockets",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Campus Display",
    "rating": 4.8,
    "downloads": 4742,
    "stars": 742
  },
  {
    "id": "iot-embedded-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Water Quality Monitoring System (pH & Turbidity)",
    "tagline": "Measures drinking water purity, pH level, and turbidity with alert thresholds.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "pH Electrode",
      "Turbidity Sensor",
      "ThingSpeak"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Environmental IoT",
    "rating": 4.8,
    "downloads": 2854,
    "stars": 954
  },
  {
    "id": "iot-embedded-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "AgroSense: IoT Smart Agriculture & Drip Irrigation",
    "tagline": "Precision farm telemetry with soil NPK sensor, weather forecast, and automated valves.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "LoRaWAN",
      "MQTT",
      "Node.js",
      "React"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "AgriTech Pre-Final",
    "rating": 4.6,
    "downloads": 2968,
    "stars": 368
  },
  {
    "id": "iot-embedded-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart Grid Solar Microinverter Monitor",
    "tagline": "Measures solar array MPPT power, grid voltage harmonics, and battery state of charge.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "Modbus RS485",
      "MQTT",
      "Grafana"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Renewable IoT",
    "rating": 4.8,
    "downloads": 4898,
    "stars": 898
  },
  {
    "id": "iot-embedded-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Remote Patient ICU Telemetry Kit with Fall & ECG",
    "tagline": "Real-time ECG waveform streaming and fall detection alert for hospital wards.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "AD8232 ECG",
      "MPU6050",
      "WebSockets"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Medical Telemetry",
    "rating": 4.7,
    "downloads": 3449,
    "stars": 849
  },
  {
    "id": "iot-embedded-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart Cold Storage Vaccine Telemetry System",
    "tagline": "Monitors ultra-low freezer vaccine temperatures with cryptographic audit logs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "PT100 RTD",
      "Cellular NB-IoT",
      "FastAPI"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Cold Chain IoT",
    "rating": 4.6,
    "downloads": 4168,
    "stars": 868
  },
  {
    "id": "iot-embedded-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Industrial Boiler Pressure & Temp Safety Interlock",
    "tagline": "Safety interlock system preventing industrial boiler over-pressure explosions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "STM32",
      "Pressure Transducer",
      "CAN Bus",
      "FreeRTOS"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Industrial Safety",
    "rating": 4.8,
    "downloads": 1962,
    "stars": 762
  },
  {
    "id": "iot-embedded-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "EV Battery Management System (BMS) Telemetry",
    "tagline": "Monitors lithium-ion cell balancing, state-of-health (SOH), and thermal runaways.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3",
      "CAN-Bus",
      "INA219",
      "Python Backend"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "EV Technology",
    "rating": 4.8,
    "downloads": 1738,
    "stars": 538
  },
  {
    "id": "iot-embedded-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart Municipal Waste Management with Route Optimization",
    "tagline": "Ultrasonic bin level monitoring and real-time garbage truck routing algorithm.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "NodeMCU",
      "Google Maps API",
      "MongoDB",
      "Express.js"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Smart Waste",
    "rating": 4.7,
    "downloads": 3449,
    "stars": 849
  },
  {
    "id": "iot-embedded-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Connected Street Lighting Network with ZigBee Mesh",
    "tagline": "Dynamic streetlight dimming and faulty lamp reporting using ZigBee mesh network.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ZigBee CC2530",
      "Arduino",
      "Raspberry Pi Gateway"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Mesh Network",
    "rating": 4.8,
    "downloads": 2634,
    "stars": 734
  },
  {
    "id": "iot-embedded-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Drone Air Pollution Sniffer Node with PM2.5 & CO2",
    "tagline": "Aerial drone sensor payload measuring vertical industrial smoke plume dispersion.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Raspberry Pi Zero",
      "Sensirion SPS30",
      "GPS",
      "Python"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Drone Sensing",
    "rating": 4.7,
    "downloads": 3917,
    "stars": 617
  },
  {
    "id": "iot-embedded-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart City Water Distribution & Pipeline Leak Tracker",
    "tagline": "Detects municipal water pipeline burst and pressure drop with differential flow sensors.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "Flow Sensors",
      "LoRa",
      "Node.js"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Infrastructure IoT",
    "rating": 4.6,
    "downloads": 3432,
    "stars": 832
  },
  {
    "id": "iot-embedded-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Acoustic Gunshot & Explosion Localization IoT Node",
    "tagline": "Triangulates gunshot coordinates using microphone array Time Difference of Arrival.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3",
      "MEMS Microphones",
      "TDoA Algorithm"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Defense IoT",
    "rating": 4.6,
    "downloads": 1864,
    "stars": 664
  },
  {
    "id": "iot-embedded-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Greenhouse Climate & Hydroponics Controller",
    "tagline": "Controls pH, EC nutrient dosing, CO2 misting, and LED grow lights.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "FreeRTOS",
      "MQTT",
      "React Dashboard"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Hydroponics",
    "rating": 4.9,
    "downloads": 4563,
    "stars": 563
  },
  {
    "id": "iot-embedded-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Underground Coal Mine Safety Helmet with Gas Sensors",
    "tagline": "Miner smart helmet detecting methane, carbon monoxide, and roof collapse vibrations.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "LoRaWAN",
      "MQ-4",
      "MPU6050",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Mining Safety",
    "rating": 4.8,
    "downloads": 3666,
    "stars": 366
  },
  {
    "id": "iot-embedded-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous Agricultural Drone for Precision Fertilizer Spraying",
    "tagline": "GPS waypoint autonomous quadcopter with flow-rate regulated chemical spray nozzles.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Pixhawk",
      "ArduPilot",
      "Raspberry Pi 4",
      "Python",
      "ROS2"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Major Capstone",
    "rating": 4.6,
    "downloads": 4340,
    "stars": 340
  },
  {
    "id": "iot-embedded-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Industrial Digital Twin with MQTT & Edge Impulse TinyML",
    "tagline": "Real-time 3D digital twin replica of factory conveyor belt with predictive maintenance.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3",
      "Three.js",
      "Edge Impulse",
      "MQTT",
      "Node.js"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Digital Twin",
    "rating": 4.7,
    "downloads": 3493,
    "stars": 893
  },
  {
    "id": "iot-embedded-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "TinyML Vibration Anomaly Detector for Factory Turbines",
    "tagline": "On-device embedded neural network detecting bearing wear on edge microcontrollers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "STM32F4",
      "TinyML",
      "TensorFlow Lite Micro",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "TinyML Edge",
    "rating": 4.8,
    "downloads": 3418,
    "stars": 818
  },
  {
    "id": "iot-embedded-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Vehicle-to-Everything (V2X) Roadside Collision Warning",
    "tagline": "Direct DSRC / C-V2X protocol roadside beacon transmitting fog and accident alerts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3",
      "Wi-Fi 802.11p",
      "CAN Bus",
      "FreeRTOS"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "V2X Automotive",
    "rating": 4.8,
    "downloads": 2814,
    "stars": 914
  },
  {
    "id": "iot-embedded-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Subsea Pipeline Leak Acoustic Locator with Hydrophone Array",
    "tagline": "Undersea pipeline monitoring using acoustic beamforming and underwater telemetry.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Raspberry Pi",
      "Hydrophone Array",
      "DSP Filters",
      "Python"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Marine IoT",
    "rating": 4.6,
    "downloads": 4932,
    "stars": 932
  },
  {
    "id": "iot-embedded-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Peer-to-Peer Microgrid Energy Trading Gateway",
    "tagline": "Smart inverter grid node negotiating automated solar energy auction transactions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "Ethereum Smart Contracts",
      "Modbus",
      "Node.js"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Energy Web3",
    "rating": 4.7,
    "downloads": 4901,
    "stars": 901
  },
  {
    "id": "iot-embedded-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous Quadcopter Medical Delivery Drone",
    "tagline": "Long-range delivery drone with obstacle avoidance LiDAR and payload release mechanism.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Pixhawk 4",
      "Mission Planner",
      "Companion Pi",
      "Python"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Drone Delivery",
    "rating": 4.7,
    "downloads": 2061,
    "stars": 861
  },
  {
    "id": "iot-embedded-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Wearable Fall Detection & Cardiac Monitor with TinyML",
    "tagline": "Smart wristband running on-device neural network classifying elderly falls.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3",
      "IMU 6-Axis",
      "TinyML",
      "BLE 5.0"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Wearable AI",
    "rating": 4.9,
    "downloads": 4775,
    "stars": 775
  },
  {
    "id": "iot-embedded-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Biometric Smart Safe with On-Device Face Recognition",
    "tagline": "High-security lockbox with local neural face embedding verification on ESP32-S3.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32-S3-CAM",
      "ESP-WHO",
      "TFT Display",
      "C++"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Biometric Edge",
    "rating": 4.9,
    "downloads": 2379,
    "stars": 479
  },
  {
    "id": "iot-embedded-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Smart City Traffic Signal Optimizer with Induction Loops & Camera",
    "tagline": "Dynamic green light duration allocator based on real-time vehicle density queues.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "Raspberry Pi 4",
      "OpenCV",
      "PLC Relay",
      "Python"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Smart Traffic",
    "rating": 4.7,
    "downloads": 2337,
    "stars": 437
  },
  {
    "id": "iot-embedded-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Wildfire Thermal Camera Early Warning Node with LoRaWAN",
    "tagline": "Solar-powered forest thermal camera node detecting smoke plumes up to 15km away.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "ESP32",
      "FLIR Lepton",
      "LoRaWAN",
      "FreeRTOS"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "Disaster IoT",
    "rating": 4.9,
    "downloads": 2927,
    "stars": 327
  },
  {
    "id": "iot-embedded-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Solar EV Charging Station Telemetry & Automated RFID Billing",
    "tagline": "Smart EV charging station managing OCPP 2.0 protocol and contactless billing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "iot-embedded",
    "categoryLabel": "IoT & Hardware",
    "techStack": [
      "STM32",
      "OCPP 2.0",
      "RFID",
      "MQTT",
      "Python"
    ],
    "icon": "cpu",
    "color": "#f59e0b",
    "badge": "EV Infrastructure",
    "rating": 4.8,
    "downloads": 2898,
    "stars": 998
  },
  {
    "id": "c-cpp-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Student Report Card & GPA Management in C++",
    "tagline": "File-based student grading, GPA calculation, and transcript generator in C++.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "File Handling",
      "OOPs",
      "CLI"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "1st Year Classic",
    "rating": 4.7,
    "downloads": 1609,
    "stars": 409
  },
  {
    "id": "c-cpp-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Bank Account & ATM Transaction Simulator in C",
    "tagline": "Menu-driven banking system managing accounts, deposits, PIN, and balance in C.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C Language",
      "Pointers",
      "Structures",
      "File I/O"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "1st Year Beginner",
    "rating": 4.7,
    "downloads": 3817,
    "stars": 517
  },
  {
    "id": "c-cpp-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Supermarket Billing & Inventory POS in C++",
    "tagline": "Fast retail billing POS software with invoice printout and stock tracking.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "File Streams",
      "Structures",
      "Console UI"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Retail POS",
    "rating": 4.9,
    "downloads": 4415,
    "stars": 415
  },
  {
    "id": "c-cpp-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Snake & Ladder 2-Player Console Board Game in C",
    "tagline": "Console arcade board game with randomized dice rolls and ASCII board visuals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Randomization",
      "Algorithms",
      "ASCII Graphics"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Game Project",
    "rating": 4.9,
    "downloads": 3115,
    "stars": 515
  },
  {
    "id": "c-cpp-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Contact Book & Phone Directory in C++",
    "tagline": "Phone directory with linear/binary search, contact editing, and CSV backup.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Binary Search",
      "File Handling",
      "Pointers"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Contact Book",
    "rating": 4.7,
    "downloads": 2421,
    "stars": 521
  },
  {
    "id": "c-cpp-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Railway Ticket Reservation & PNR Status in C++",
    "tagline": "Train booking system with seat allocation, waiting list logic, and ticket cancellation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Data Structures",
      "File Handling",
      "OOPs"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Popular Mini",
    "rating": 4.9,
    "downloads": 3463,
    "stars": 863
  },
  {
    "id": "c-cpp-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Hospital Patient Record & OPD Token System in C++",
    "tagline": "Patient registry with doctor appointment queue management and prescription generation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Linked Lists",
      "Queue DS",
      "File I/O"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Healthcare Mini",
    "rating": 4.8,
    "downloads": 2030,
    "stars": 830
  },
  {
    "id": "c-cpp-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Matrix Mathematics & Linear Algebra Solver in C",
    "tagline": "Matrix addition, multiplication, inverse, and linear equation solver in C.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Multidimensional Arrays",
      "Linear Algebra",
      "Algorithms"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Math & Engineering",
    "rating": 4.9,
    "downloads": 2619,
    "stars": 719
  },
  {
    "id": "c-cpp-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Hostel Room Allocation & Mess Management in C++",
    "tagline": "Hostel warden software tracking student room allotments and monthly mess fees.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "File Handling",
      "Data Management",
      "CLI"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Campus Mini",
    "rating": 4.9,
    "downloads": 2131,
    "stars": 931
  },
  {
    "id": "c-cpp-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Electricity Bill Calculator & Tariff Estimator in C",
    "tagline": "Calculates monthly power billing based on multi-slab kilowatt-hour consumption.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Control Flow",
      "File Handling",
      "CLI"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Utility Mini",
    "rating": 4.8,
    "downloads": 4338,
    "stars": 338
  },
  {
    "id": "c-cpp-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Number Guessing & Binary Search Game in C++",
    "tagline": "Interactive game illustrating linear versus binary search computational complexity.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Binary Search",
      "Algorithms"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Algorithm Demo",
    "rating": 4.8,
    "downloads": 4030,
    "stars": 730
  },
  {
    "id": "c-cpp-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Rock Paper Scissors Game with Score History in C",
    "tagline": "Console game with randomized bot decision engine and win streak tracking.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Randomization",
      "File I/O"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Game Mini",
    "rating": 4.7,
    "downloads": 3825,
    "stars": 525
  },
  {
    "id": "c-cpp-13",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Simple Employee Salary Slip Generator in C++",
    "tagline": "Calculates HRA, DA, PF deductions, and prints payroll tax breakdown.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "OOPs",
      "File Handling"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Payroll Mini",
    "rating": 4.6,
    "downloads": 4280,
    "stars": 980
  },
  {
    "id": "c-cpp-14",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Mini Parking Lot Space Allocation Manager in C",
    "tagline": "Manages 2-wheeler and 4-wheeler parking slot allocation and hourly charges.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Arrays",
      "Structures",
      "File I/O"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Parking Mini",
    "rating": 4.6,
    "downloads": 4908,
    "stars": 908
  },
  {
    "id": "c-cpp-15",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Engineering Unit Converter in C",
    "tagline": "Converts pressure, force, energy, temperature, and torque metric units.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Functions",
      "Math Formulas"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Engineering Mini",
    "rating": 4.6,
    "downloads": 4324,
    "stars": 324
  },
  {
    "id": "c-cpp-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Dynamic Memory Allocator & Garbage Collector Simulator",
    "tagline": "Custom malloc/free implementation using free-list and segregated block tracking.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Pointers",
      "Memory Management",
      "Data Structures"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Systems Mini",
    "rating": 4.7,
    "downloads": 2465,
    "stars": 565
  },
  {
    "id": "c-cpp-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Mini Unix Shell (sh) with Pipes & I/O Redirection",
    "tagline": "Custom command shell supporting fork, execvp, pipes (|), and file redirection (>).",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "POSIX API",
      "Processes",
      "Pipes"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "OS Mini",
    "rating": 4.9,
    "downloads": 3415,
    "stars": 815
  },
  {
    "id": "c-cpp-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Multithreaded HTTP Web Server in Modern C++",
    "tagline": "High-performance HTTP/1.1 socket server using POSIX threads and thread pool.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++17",
      "Sockets",
      "pthreads",
      "HTTP/1.1"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Networking",
    "rating": 4.8,
    "downloads": 4402,
    "stars": 402
  },
  {
    "id": "c-cpp-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "B-Tree & Red-Black Tree Database Indexer",
    "tagline": "Self-balancing tree indexing engine achieving sub-millisecond key lookups.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Red-Black Tree",
      "B-Tree",
      "Algorithms"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Data Structures",
    "rating": 4.7,
    "downloads": 4757,
    "stars": 757
  },
  {
    "id": "c-cpp-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Huffman Lossless File Compression Tool in C++",
    "tagline": "Lossless data compression and decompression utility using Huffman prefix trees.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Huffman Coding",
      "Bit Manipulation",
      "File I/O"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Compression",
    "rating": 4.8,
    "downloads": 3770,
    "stars": 470
  },
  {
    "id": "c-cpp-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "CPU Process Scheduler Simulation in C++",
    "tagline": "Simulates Round Robin, Shortest Job First (SJF), and Multilevel Queue scheduling.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Queues",
      "OS Algorithms",
      "CLI"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "OS Simulation",
    "rating": 4.8,
    "downloads": 2942,
    "stars": 342
  },
  {
    "id": "c-cpp-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Hardware Cache Simulator (LRU, LFU, Direct Mapped)",
    "tagline": "Simulates L1/L2 CPU cache hits, misses, and eviction policies with trace files.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Cache Memory",
      "Computer Architecture"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Architecture",
    "rating": 4.8,
    "downloads": 3378,
    "stars": 778
  },
  {
    "id": "c-cpp-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Ray Tracer 3D Rendering Engine in C++",
    "tagline": "Renders photorealistic 3D spheres, reflections, shadows, and diffuse lighting.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Vector Math",
      "Ray Tracing",
      "PPM Output"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Graphics Engine",
    "rating": 4.9,
    "downloads": 4439,
    "stars": 439
  },
  {
    "id": "c-cpp-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Relational Database Engine with Custom B-Tree Storage",
    "tagline": "SQL query parser executing SELECT, INSERT, WHERE with disk-backed B-Tree pages.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Database Internals",
      "B-Tree",
      "Disk Pages"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Database Engine",
    "rating": 4.6,
    "downloads": 2384,
    "stars": 484
  },
  {
    "id": "c-cpp-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Lexical Analyzer & AST Parser Generator in C",
    "tagline": "Tokenizes and builds Abstract Syntax Trees for a custom programming mini-language.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Lexer",
      "Parser",
      "AST",
      "Compiler"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Compiler Design",
    "rating": 4.6,
    "downloads": 4184,
    "stars": 884
  },
  {
    "id": "c-cpp-26",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Virtual Machine Bytecode Interpreter in C++",
    "tagline": "Stack-based virtual machine executing custom assembler bytecode instructions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Virtual Machine",
      "Bytecode",
      "Registers"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "VM Systems",
    "rating": 4.9,
    "downloads": 2875,
    "stars": 975
  },
  {
    "id": "c-cpp-27",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Network Packet Sniffer & Protocol Analyzer with Raw Sockets",
    "tagline": "Captures Ethernet frames and decodes TCP, UDP, IP, and ICMP headers in C.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Raw Sockets",
      "pcap",
      "Network Protocols"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Networking",
    "rating": 4.7,
    "downloads": 1645,
    "stars": 445
  },
  {
    "id": "c-cpp-28",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Embedded Key-Value Store with Write-Ahead Logging (WAL)",
    "tagline": "Crash-resilient persistent key-value store with memory table and WAL journal.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "WAL",
      "Persistence",
      "Storage"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Storage Systems",
    "rating": 4.9,
    "downloads": 2339,
    "stars": 439
  },
  {
    "id": "c-cpp-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "SQLite-Compatible Relational DBMS from Scratch",
    "tagline": "Disk-backed relational database engine with B-Tree pages and SQL REPL.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++17",
      "SQL Parser",
      "B-Tree",
      "File Storage"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Database Pre-Final",
    "rating": 4.8,
    "downloads": 4238,
    "stars": 938
  },
  {
    "id": "c-cpp-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "High-Performance HTTP/2 Asynchronous Server in C++20",
    "tagline": "Non-blocking multiplexed HTTP/2 server using epoll and coroutines.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++20",
      "epoll",
      "Coroutines",
      "HTTP/2"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Async Systems",
    "rating": 4.6,
    "downloads": 3504,
    "stars": 904
  },
  {
    "id": "c-cpp-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cross-Platform 2D/3D Game Engine with OpenGL",
    "tagline": "Game development engine with entity-component system (ECS), physics, and shaders.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "OpenGL",
      "GLFW",
      "GLSL",
      "Box2D"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Game Engine",
    "rating": 4.8,
    "downloads": 2942,
    "stars": 342
  },
  {
    "id": "c-cpp-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Memory-Mapped High-Frequency Order Matching Engine",
    "tagline": "Low-latency financial order book matching buy/sell bids in under 10 microseconds.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++20",
      "Memory Mapping",
      "Lock-Free Queues",
      "FinTech"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "High-Frequency Tech",
    "rating": 4.8,
    "downloads": 3142,
    "stars": 542
  },
  {
    "id": "c-cpp-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Ext2 File System Inode Parser & Forensic Extractor",
    "tagline": "Raw disk image parser reconstructing deleted directories and inode allocations.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Ext2",
      "File Systems",
      "Forensics"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "File Systems",
    "rating": 4.7,
    "downloads": 4353,
    "stars": 353
  },
  {
    "id": "c-cpp-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Fast Fourier Transform (FFT) Audio Equalizer in C++",
    "tagline": "Real-time audio frequency filtering and spectral visualization with Cooley-Tukey FFT.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "FFT",
      "DSP",
      "PortAudio"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Audio DSP",
    "rating": 4.8,
    "downloads": 1654,
    "stars": 454
  },
  {
    "id": "c-cpp-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Linux Kernel Module for Custom Character Device",
    "tagline": "Kernel driver providing ring-buffered IPC communication between user applications.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "Linux Kernel",
      "Kernel Modules",
      "IPC"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Kernel Driver",
    "rating": 4.7,
    "downloads": 3205,
    "stars": 605
  },
  {
    "id": "c-cpp-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Static Code Analysis & Linting Tool for C++",
    "tagline": "Parses C++ syntax trees to flag memory leaks, buffer overflows, and style violations.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Clang AST",
      "Static Analysis",
      "Compilers"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "DevTools",
    "rating": 4.6,
    "downloads": 4084,
    "stars": 784
  },
  {
    "id": "c-cpp-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Multithreaded BitTorrent Client Protocol Implementation",
    "tagline": "P2P torrent client implementing peer wire protocol, tracker handshakes, and piece hashing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "BitTorrent Protocol",
      "Sockets",
      "SHA-1"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "P2P Systems",
    "rating": 4.9,
    "downloads": 3583,
    "stars": 983
  },
  {
    "id": "c-cpp-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cryptographic Suite: AES-256, RSA & SHA-256 in C++",
    "tagline": "Hardware-accelerated AES cipher, RSA public-key generator, and SHA-256 hasher.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Cryptography",
      "AES-256",
      "RSA",
      "SIMD"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Crypto Systems",
    "rating": 4.6,
    "downloads": 2060,
    "stars": 860
  },
  {
    "id": "c-cpp-39",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "High-Performance In-Memory Graph Analytics Engine",
    "tagline": "Parallel graph compute engine executing PageRank and BFS across millions of vertices.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "OpenMP",
      "Graph Algorithms",
      "Multithreading"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Graph Compute",
    "rating": 4.7,
    "downloads": 1541,
    "stars": 341
  },
  {
    "id": "c-cpp-40",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Raft Distributed Consensus Protocol Implementation in C++",
    "tagline": "Leader election, log replication, and split-brain safety across cluster nodes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Raft",
      "Distributed Systems",
      "RPC"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Distributed Systems",
    "rating": 4.8,
    "downloads": 4318,
    "stars": 318
  },
  {
    "id": "c-cpp-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "x86 32-Bit Microkernel Operating System",
    "tagline": "Protected mode OS kernel with bootloader, virtual memory paging, interrupts, and shell.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "x86 Assembly",
      "OS Kernel",
      "Paging",
      "QEMU"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "OS Capstone",
    "rating": 4.9,
    "downloads": 2823,
    "stars": 923
  },
  {
    "id": "c-cpp-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Redis Clone: In-Memory Distributed Cache with Cluster Sync",
    "tagline": "High-throughput key-value cache supporting RESP protocol, eviction, and replication.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++20",
      "epoll",
      "Redis Protocol",
      "Networking"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Major Capstone",
    "rating": 4.7,
    "downloads": 2501,
    "stars": 601
  },
  {
    "id": "c-cpp-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Hardware-Accelerated Vulkan & CUDA Path Tracer",
    "tagline": "Real-time ray tracing pipeline computing global illumination on modern GPUs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Vulkan API",
      "CUDA",
      "GLSL Shaders"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "GPU Graphics",
    "rating": 4.9,
    "downloads": 4455,
    "stars": 455
  },
  {
    "id": "c-cpp-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "WebAssembly JIT Compiler Engine",
    "tagline": "Translates WebAssembly binary bytecode (.wasm) into native x86-64 machine instructions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "JIT Compiler",
      "Wasm",
      "Assembly"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Compiler Capstone",
    "rating": 4.6,
    "downloads": 4808,
    "stars": 808
  },
  {
    "id": "c-cpp-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Distributed Fault-Tolerant Key-Value Store with Paxos",
    "tagline": "Multi-node consensus database guaranteeing strict serializability under network partitions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "Paxos",
      "Distributed Systems",
      "gRPC"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Distributed DB",
    "rating": 4.6,
    "downloads": 4036,
    "stars": 736
  },
  {
    "id": "c-cpp-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Hardware-Accelerated H.264 Video Transcoding Pipeline",
    "tagline": "Encodes and decodes raw YUV video frames into compressed H.264 streams with SIMD AVX2.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "SIMD AVX2",
      "Video Codecs",
      "DSP"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Media Systems",
    "rating": 4.9,
    "downloads": 4255,
    "stars": 955
  },
  {
    "id": "c-cpp-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Real-Time Operating System (RTOS) Kernel for ARM Cortex-M",
    "tagline": "Preemptive RTOS with deterministic task scheduler, semaphores, and mutexes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "ARM Assembly",
      "Cortex-M",
      "FreeRTOS Internals"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Embedded OS",
    "rating": 4.6,
    "downloads": 3684,
    "stars": 384
  },
  {
    "id": "c-cpp-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Time-Series Database (TSDB) with Gorilla Compression",
    "tagline": "Compressed metrics database engine capable of ingesting 1M points per second.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++20",
      "Gorilla Compression",
      "TSDB",
      "Storage Engine"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "TSDB Engine",
    "rating": 4.6,
    "downloads": 4988,
    "stars": 988
  },
  {
    "id": "c-cpp-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Custom TLS 1.3 Cryptographic Stack & Handshake Engine",
    "tagline": "Zero-dependency TLS 1.3 protocol handshake with ECDHE key exchange and ChaCha20-Poly1305.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C++",
      "TLS 1.3",
      "ECDHE",
      "Security Protocols"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "Security Protocol",
    "rating": 4.9,
    "downloads": 3735,
    "stars": 435
  },
  {
    "id": "c-cpp-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Zero-Copy 10Gbps Packet Processing Engine with DPDK",
    "tagline": "Kernel-bypass network framework inspecting wire-speed packets without context switches.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "c-cpp",
    "categoryLabel": "C / C++ Systems",
    "techStack": [
      "C",
      "DPDK",
      "Kernel Bypass",
      "High-Speed Networking"
    ],
    "icon": "code",
    "color": "#10b981",
    "badge": "High-Speed Network",
    "rating": 4.7,
    "downloads": 1873,
    "stars": 673
  },
  {
    "id": "python-data-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Personal Budget & Daily Expense Tracker in Python",
    "tagline": "Terminal application for tracking expenses, budget alerts, and CSV exports.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "CSV Module",
      "Datetime",
      "Matplotlib"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Popular Mini",
    "rating": 4.6,
    "downloads": 2948,
    "stars": 348
  },
  {
    "id": "python-data-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Student Attendance & CGPA Calculator with Charts",
    "tagline": "Calculates semester GPA and visualizes subject-wise attendance percentages.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Pandas",
      "Matplotlib",
      "CLI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "College Utility",
    "rating": 4.6,
    "downloads": 4116,
    "stars": 816
  },
  {
    "id": "python-data-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "E-Commerce Price Drop Tracker & Web Scraper",
    "tagline": "Scrapes e-commerce product pages and sends email notifications when prices fall.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "BeautifulSoup4",
      "Requests",
      "smtplib"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Web Scraper",
    "rating": 4.9,
    "downloads": 2355,
    "stars": 455
  },
  {
    "id": "python-data-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Automated PDF Invoice Generator with ReportLab",
    "tagline": "Generates professional branded PDF billing invoices from transaction data.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "ReportLab",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Automation",
    "rating": 4.7,
    "downloads": 3953,
    "stars": 653
  },
  {
    "id": "python-data-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Weather Forecast CLI with OpenWeather API",
    "tagline": "Fetches real-time 5-day weather forecasts, humidity, and barometric pressure.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "REST API",
      "JSON",
      "CLI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "API Mini",
    "rating": 4.9,
    "downloads": 1659,
    "stars": 459
  },
  {
    "id": "python-data-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Wikipedia Summary & Text-to-Speech Audio Book Tool",
    "tagline": "Summarizes Wikipedia articles and converts text into spoken audio MP3 files.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Wikipedia API",
      "gTTS",
      "Pygame"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Text-to-Speech",
    "rating": 4.7,
    "downloads": 1669,
    "stars": 469
  },
  {
    "id": "python-data-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Encrypted Password Manager with SQLite & Fernet",
    "tagline": "Secure local password vault protected with Master Password and AES Fernet encryption.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Cryptography",
      "SQLite3",
      "Fernet"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Security Tool",
    "rating": 4.8,
    "downloads": 2586,
    "stars": 686
  },
  {
    "id": "python-data-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Automated Email Newsletter Dispatcher",
    "tagline": "Sends personalized HTML email reports to subscriber lists with attachments.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "smtplib",
      "Email MIME",
      "CSV"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Email Bot",
    "rating": 4.7,
    "downloads": 3385,
    "stars": 785
  },
  {
    "id": "python-data-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "COVID-19 Global Statistics Tracker with Matplotlib",
    "tagline": "Visualizes infection curves, recovery rates, and mortality trends by country.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Matplotlib",
      "Pandas",
      "REST API"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Data Visualizer",
    "rating": 4.7,
    "downloads": 2509,
    "stars": 609
  },
  {
    "id": "python-data-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Live Foreign Currency Converter with Historical Charts",
    "tagline": "Converts multi-currency exchange rates with historical fluctuation line graphs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Requests",
      "Matplotlib",
      "Tkinter"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Forex Tool",
    "rating": 4.6,
    "downloads": 4232,
    "stars": 932
  },
  {
    "id": "python-data-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Markdown to Clean HTML Document Compiler",
    "tagline": "Compiles markdown headings, code blocks, and tables into styled HTML files.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Regular Expressions",
      "File I/O"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Text Parser",
    "rating": 4.9,
    "downloads": 1615,
    "stars": 415
  },
  {
    "id": "python-data-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Desktop Downloads Auto-Organizer & File Sorter",
    "tagline": "Monitors downloads folder and auto-moves files into categorized directories.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "os",
      "shutil",
      "Watchdog"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Productivity Bot",
    "rating": 4.6,
    "downloads": 4204,
    "stars": 904
  },
  {
    "id": "python-data-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Exploratory Data Analysis (EDA) of Global Stock Markets",
    "tagline": "Comprehensive statistical analysis and correlation heatmaps of S&P 500 stocks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Pandas",
      "Seaborn",
      "Plotly",
      "Jupyter"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Finance EDA",
    "rating": 4.6,
    "downloads": 4904,
    "stars": 904
  },
  {
    "id": "python-data-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Customer Segmentation with RFM Analysis & K-Means",
    "tagline": "Clusters retail customer base by Recency, Frequency, and Monetary parameters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Scikit-Learn",
      "K-Means",
      "Seaborn"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Marketing Analytics",
    "rating": 4.7,
    "downloads": 1905,
    "stars": 705
  },
  {
    "id": "python-data-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Airbnb Rental Price Geospatial Analysis with Folium",
    "tagline": "Interactive geospatial heatmaps analyzing neighborhood pricing drivers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Folium",
      "GeoPandas",
      "Streamlit"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Geospatial Data",
    "rating": 4.8,
    "downloads": 4438,
    "stars": 438
  },
  {
    "id": "python-data-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "YouTube Video Comment Sentiment & Topic Modeler",
    "tagline": "Scrapes YouTube video comments and extracts dominant topics with LDA.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "YouTube API",
      "NLTK",
      "LDA Topic Modeling"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "NLP Mining",
    "rating": 4.9,
    "downloads": 3039,
    "stars": 439
  },
  {
    "id": "python-data-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Music Recommendation Engine with Collaborative Filtering",
    "tagline": "Predicts user song ratings using Singular Value Decomposition (SVD).",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Surprise Library",
      "Pandas",
      "Scikit-Learn"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Recommender",
    "rating": 4.7,
    "downloads": 4713,
    "stars": 713
  },
  {
    "id": "python-data-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Credit Score Rating Classification with XGBoost",
    "tagline": "Classifies loan applicants into Poor, Standard, and Good credit tiers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "XGBoost",
      "Scikit-Learn",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Credit Risk",
    "rating": 4.7,
    "downloads": 2777,
    "stars": 877
  },
  {
    "id": "python-data-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Fake Job Postings Detection & Text Classification",
    "tagline": "Flags fraudulent recruitment listings using NLP features and Random Forest.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Scikit-Learn",
      "TF-IDF",
      "Streamlit"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Cyber Analytics",
    "rating": 4.7,
    "downloads": 1617,
    "stars": 417
  },
  {
    "id": "python-data-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Automated Data Cleaning & Imputation Pipeline",
    "tagline": "Detects missing data, removes outliers, and generates automated quality reports.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Pandas",
      "NumPy",
      "Scipy",
      "ReportLab"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Data Engineering",
    "rating": 4.6,
    "downloads": 2796,
    "stars": 896
  },
  {
    "id": "python-data-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Retail Sales Forecasting with Meta Prophet",
    "tagline": "Forecasts seasonal daily sales demand across multi-store retail supermarket chains.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Prophet",
      "Plotly",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Time Series",
    "rating": 4.6,
    "downloads": 1788,
    "stars": 588
  },
  {
    "id": "python-data-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Market Basket Analysis with Apriori & Association Rules",
    "tagline": "Identifies frequently co-purchased items to optimize supermarket shelving.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "MLxtend",
      "Apriori",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Retail Analytics",
    "rating": 4.8,
    "downloads": 4894,
    "stars": 894
  },
  {
    "id": "python-data-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Commercial Flight Delay Prediction with LightGBM",
    "tagline": "Predicts flight departure delays using weather, carrier, and airport congestion data.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "LightGBM",
      "Scikit-Learn",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Aviation Analytics",
    "rating": 4.7,
    "downloads": 3169,
    "stars": 569
  },
  {
    "id": "python-data-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Interactive Sports Analytics Dashboard with Streamlit",
    "tagline": "Visualizes player performance, strike rates, and team head-to-head metrics.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Streamlit",
      "Plotly",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Sports Data",
    "rating": 4.6,
    "downloads": 3768,
    "stars": 468
  },
  {
    "id": "python-data-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Job Market Tech Skills Trend Analyzer (Selenium Scraper)",
    "tagline": "Scrapes thousands of LinkedIn/Indeed jobs to chart in-demand programming stacks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Selenium",
      "Pandas",
      "WordCloud"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Market Trends",
    "rating": 4.9,
    "downloads": 1627,
    "stars": 427
  },
  {
    "id": "python-data-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Real-Time Stock Market Streaming Pipeline (Kafka & Pandas)",
    "tagline": "Processes live stock ticker market streams with Apache Kafka and DuckDB.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Apache Kafka",
      "DuckDB",
      "Plotly",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Data Engineering",
    "rating": 4.6,
    "downloads": 4832,
    "stars": 832
  },
  {
    "id": "python-data-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "E-Commerce Deep Recommendation System (Neural Collaborative)",
    "tagline": "Neural Matrix Factorization model recommending products with deep embeddings.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "PyTorch",
      "Pandas",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Deep Recommender",
    "rating": 4.7,
    "downloads": 1625,
    "stars": 425
  },
  {
    "id": "python-data-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Clinical Trials NLP Entity Extraction with SciSpacy",
    "tagline": "Extracts drug dosages, adverse reactions, and diseases from biomedical journals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "SciSpacy",
      "HuggingFace",
      "Streamlit"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Biomedical NLP",
    "rating": 4.7,
    "downloads": 2141,
    "stars": 941
  },
  {
    "id": "python-data-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Financial Statement Anomaly & Fraud Detector",
    "tagline": "Identifies revenue inflation and audit red flags in corporate balance sheets.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Isolation Forest",
      "Pandas",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Forensic Finance",
    "rating": 4.8,
    "downloads": 3074,
    "stars": 474
  },
  {
    "id": "python-data-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Server Fleet Infrastructure Metric Anomaly Detector",
    "tagline": "Monitors CPU, RAM, and network I/O anomalies on cloud server clusters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "LSTM Autoencoder",
      "Prometheus",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "DevOps Analytics",
    "rating": 4.6,
    "downloads": 4524,
    "stars": 524
  },
  {
    "id": "python-data-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Urban Ride-Hailing Spatial-Temporal Demand Forecaster",
    "tagline": "Predicts city zone pickup requests using spatial-temporal graph neural networks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "PyTorch Geometric",
      "GeoPandas",
      "Plotly"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Urban Mobility",
    "rating": 4.6,
    "downloads": 1568,
    "stars": 368
  },
  {
    "id": "python-data-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Customer Lifetime Value (CLV) & Churn Probability Model",
    "tagline": "Calculates future customer value using BG/NBD and Gamma-Gamma statistical models.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Lifetimes",
      "Pandas",
      "Seaborn"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Predictive CLV",
    "rating": 4.8,
    "downloads": 3634,
    "stars": 334
  },
  {
    "id": "python-data-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Social Media Influencer Engagement Predictor",
    "tagline": "Forecasts post viral potential and sponsored engagement rates from visual/text cues.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "XGBoost",
      "Transformers",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Marketing AI",
    "rating": 4.9,
    "downloads": 2823,
    "stars": 923
  },
  {
    "id": "python-data-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Feature Engineering Pipeline (Featuretools)",
    "tagline": "Auto-generates thousands of relational deep features from multi-table schemas.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Featuretools",
      "Pandas",
      "Scikit-Learn"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "AutoML Tools",
    "rating": 4.6,
    "downloads": 4636,
    "stars": 636
  },
  {
    "id": "python-data-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Satellite Normalized Difference Vegetation Index (NDVI) Mapper",
    "tagline": "Calculates drought severity and crop health from Sentinel-2 multispectral rasters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Rasterio",
      "GeoPandas",
      "Matplotlib"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Remote Sensing",
    "rating": 4.8,
    "downloads": 3966,
    "stars": 666
  },
  {
    "id": "python-data-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Audio Feature Extraction & Musical Key Detection (Librosa)",
    "tagline": "Extracts harmonic pitch classes and chroma energy distributions from audio.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Librosa",
      "NumPy",
      "Plotly"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Audio Science",
    "rating": 4.9,
    "downloads": 2091,
    "stars": 891
  },
  {
    "id": "python-data-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "National Grid Hourly Energy Demand Forecaster with LSTM",
    "tagline": "Recurrent neural network predicting peak electricity grid load 24 hours ahead.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "TensorFlow",
      "LSTM",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Energy Analytics",
    "rating": 4.7,
    "downloads": 3801,
    "stars": 501
  },
  {
    "id": "python-data-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Supply Chain Lead Time Risk Predictor with Bayesian Models",
    "tagline": "Estimates shipment delay probabilities using Bayesian hierarchical modeling.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "PyMC",
      "ArviZ",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Supply Chain Data",
    "rating": 4.6,
    "downloads": 1532,
    "stars": 332
  },
  {
    "id": "python-data-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Big Data Analytics Pipeline with PySpark & Delta Lake",
    "tagline": "Distributed ETL pipeline processing 100M+ e-commerce events on Apache Spark.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "PySpark",
      "Delta Lake",
      "AWS S3 / GCP",
      "Parquet"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Major Capstone",
    "rating": 4.6,
    "downloads": 3100,
    "stars": 500
  },
  {
    "id": "python-data-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Algorithmic Trading Backtesting Engine with Alpaca API",
    "tagline": "Automated multi-asset quantitative trading system with portfolio risk metrics.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Backtrader",
      "Alpaca API",
      "NumPy",
      "Pandas"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Algo Trading",
    "rating": 4.7,
    "downloads": 3589,
    "stars": 989
  },
  {
    "id": "python-data-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Graph Analytics for Financial Fraud Rings Detection",
    "tagline": "Identifies circular money laundering networks using NetworkX and GNNs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "NetworkX",
      "PyTorch Geometric",
      "Neo4j"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Graph AI",
    "rating": 4.6,
    "downloads": 3644,
    "stars": 344
  },
  {
    "id": "python-data-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Multimodal Medical Decision Support Pipeline",
    "tagline": "Integrates patient laboratory numbers, clinical notes, and scans into single diagnosis.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Transformers",
      "PyTorch",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Medical Data AI",
    "rating": 4.6,
    "downloads": 3832,
    "stars": 532
  },
  {
    "id": "python-data-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Causal Inference Engine for Marketing Attribution (DoWhy)",
    "tagline": "Estimates true causal uplift of promotional discounts using propensity scoring.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "DoWhy",
      "CausalML",
      "Statsmodels"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Causal Science",
    "rating": 4.9,
    "downloads": 2763,
    "stars": 863
  },
  {
    "id": "python-data-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Enterprise Automated Machine Learning (AutoML) Engine",
    "tagline": "Auto-tunes hyperparameters, selects optimal model architectures, and exports APIs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Optuna",
      "Scikit-Learn",
      "FastAPI",
      "Docker"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "AutoML Platform",
    "rating": 4.8,
    "downloads": 3590,
    "stars": 990
  },
  {
    "id": "python-data-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Spatial-Temporal Traffic Flow Forecasting with Graph CNN",
    "tagline": "Citywide road speed predictions utilizing spatial graph convolutions and gated GRUs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "PyTorch Geometric",
      "DGL",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Traffic AI",
    "rating": 4.6,
    "downloads": 4088,
    "stars": 788
  },
  {
    "id": "python-data-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Large-Scale Document Q&A with LangChain & FAISS RAG",
    "tagline": "Retrieval-augmented generation system over enterprise PDF document archives.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "LangChain",
      "FAISS",
      "HuggingFace",
      "FastAPI"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "RAG Architecture",
    "rating": 4.7,
    "downloads": 4693,
    "stars": 693
  },
  {
    "id": "python-data-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Automated ESG Sustainability Scoring & Risk Analyzer",
    "tagline": "Extracts environmental and governance indicators from corporate sustainability filings.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "BERT",
      "Spacy",
      "Streamlit"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "ESG Analytics",
    "rating": 4.7,
    "downloads": 4497,
    "stars": 497
  },
  {
    "id": "python-data-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Explainable AI (XAI) Model Auditing Dashboard (SHAP/LIME)",
    "tagline": "Enterprise model interpretability suite computing Shapley feature contributions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "SHAP",
      "LIME",
      "Plotly",
      "Streamlit"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Explainable AI",
    "rating": 4.8,
    "downloads": 3762,
    "stars": 462
  },
  {
    "id": "python-data-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Genomic Variant Calling & Mutation Frequency Pipeline",
    "tagline": "High-throughput DNA sequencing variant annotation and disease correlation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "Python",
      "Biopython",
      "Pandas",
      "Scipy"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Genomics Data",
    "rating": 4.8,
    "downloads": 4102,
    "stars": 802
  },
  {
    "id": "python-data-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Real-Time Cyber Anomaly Detector with PySpark Streaming",
    "tagline": "Analyzes live network flow logs to flag DDoS and zero-day intrusion patterns.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "python-data",
    "categoryLabel": "Python & Data Science",
    "techStack": [
      "PySpark",
      "Kafka",
      "Elasticsearch",
      "Python"
    ],
    "icon": "terminal",
    "color": "#3b82f6",
    "badge": "Streaming Cyber",
    "rating": 4.7,
    "downloads": 4821,
    "stars": 821
  },
  {
    "id": "web-dev-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Interactive Scientific & Unit Converter Calculator",
    "tagline": "Web-based scientific calculator with trigonometric and metric conversion modes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "MathJS"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Web Dev Starter",
    "rating": 4.9,
    "downloads": 3395,
    "stars": 795
  },
  {
    "id": "web-dev-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Responsive Personal Portfolio Website with Dark Mode",
    "tagline": "Modern responsive portfolio showcasing student skills, resume, and project cards.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "Vanilla JS",
      "Flexbox"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Portfolio",
    "rating": 4.8,
    "downloads": 3122,
    "stars": 522
  },
  {
    "id": "web-dev-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "To-Do List & Task Organizer with LocalStorage",
    "tagline": "Productivity web app with task categories, priority tags, and persistence.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Productivity Mini",
    "rating": 4.9,
    "downloads": 3427,
    "stars": 827
  },
  {
    "id": "web-dev-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Digital Sticky Notes & Kanban Pinboard",
    "tagline": "Drag-and-drop sticky notes board for ideas and daily reminders.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Drag and Drop API"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "UI Mini",
    "rating": 4.9,
    "downloads": 2679,
    "stars": 779
  },
  {
    "id": "web-dev-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Interactive Quiz Web Application with Countdown Timer",
    "tagline": "Dynamic multiple-choice quiz with immediate scorecards and review screens.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "EdTech Mini",
    "rating": 4.6,
    "downloads": 2972,
    "stars": 372
  },
  {
    "id": "web-dev-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Recipe Finder Web App with Spoonacular REST API",
    "tagline": "Search culinary recipes by ingredients with nutritional breakdown.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Fetch API"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "API Mini",
    "rating": 4.9,
    "downloads": 3491,
    "stars": 891
  },
  {
    "id": "web-dev-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Daily Habit Tracker with Streak Counter & LocalStorage",
    "tagline": "Visual habit grid tracking monthly streaks and completion badges.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Habit App",
    "rating": 4.6,
    "downloads": 2936,
    "stars": 336
  },
  {
    "id": "web-dev-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Markdown Live Preview Editor & HTML Exporter",
    "tagline": "Side-by-side markdown writing workspace with real-time styled HTML output.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Marked.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Developer Tool",
    "rating": 4.7,
    "downloads": 3637,
    "stars": 337
  },
  {
    "id": "web-dev-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "GitHub User Profile & Repository Explorer",
    "tagline": "Search developers and visualize repository stars, forks, and top languages.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "GitHub API"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Dev API",
    "rating": 4.9,
    "downloads": 4023,
    "stars": 723
  },
  {
    "id": "web-dev-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Restaurant Tip & Bill Splitter Calculator",
    "tagline": "Calculates individual shares, taxes, and service tips for group dining.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Finance Mini",
    "rating": 4.6,
    "downloads": 4480,
    "stars": 480
  },
  {
    "id": "web-dev-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Interactive Keyboard Drum Kit Audio App",
    "tagline": "Play drum beats and audio synthesizers using keyboard hotkeys.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "Web Audio API",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Audio Web",
    "rating": 4.8,
    "downloads": 3666,
    "stars": 366
  },
  {
    "id": "web-dev-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Typing Speed Tester with Words-Per-Minute Score",
    "tagline": "Measures typing velocity (WPM) and accuracy against sample paragraphs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Utility Game",
    "rating": 4.7,
    "downloads": 2785,
    "stars": 885
  },
  {
    "id": "web-dev-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Full-Stack Blogging Platform with Flask & SQLite",
    "tagline": "Multi-author blogging CMS with markdown editor, user authentication, and comments.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Python",
      "Flask",
      "SQLite3",
      "Bootstrap",
      "Jinja2"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Full-Stack Mini",
    "rating": 4.7,
    "downloads": 1849,
    "stars": 649
  },
  {
    "id": "web-dev-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Real-Time Group Chat App with Node.js & Socket.io",
    "tagline": "Instant messaging application with chatrooms, active typing indicators, and emojis.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Express",
      "Socket.io",
      "HTML5/CSS3"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Real-Time Web",
    "rating": 4.9,
    "downloads": 4251,
    "stars": 951
  },
  {
    "id": "web-dev-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Task Management Kanban Board (Trello Clone)",
    "tagline": "Drag-and-drop project kanban board with columns, card tags, and deadline alerts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "CSS Modules",
      "LocalStorage / Firebase"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "React Productivity",
    "rating": 4.7,
    "downloads": 2153,
    "stars": 953
  },
  {
    "id": "web-dev-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "E-Commerce Shopping Cart with Stripe Checkout",
    "tagline": "Product store catalog with dynamic cart state and secure Stripe payments.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Express",
      "Stripe API",
      "MongoDB",
      "React"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "E-Commerce",
    "rating": 4.8,
    "downloads": 2214,
    "stars": 314
  },
  {
    "id": "web-dev-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Student Course Registration Portal with PHP & MySQL",
    "tagline": "University portal for course enrollment, faculty allocations, and timetable display.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "PHP",
      "MySQL",
      "Bootstrap",
      "JavaScript"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "College Portal",
    "rating": 4.6,
    "downloads": 3676,
    "stars": 376
  },
  {
    "id": "web-dev-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Job Board & Candidate Resume Submission Portal",
    "tagline": "Companies post vacancies while candidates apply with uploaded PDF resumes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Express",
      "MongoDB",
      "Multer"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Recruitment Web",
    "rating": 4.8,
    "downloads": 4842,
    "stars": 842
  },
  {
    "id": "web-dev-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Roommate Expense Sharing Web App (Splitwise Clone)",
    "tagline": "Tracks shared apartment bills, auto-settles debt balances, and exports summaries.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Finance SaaS",
    "rating": 4.9,
    "downloads": 2119,
    "stars": 919
  },
  {
    "id": "web-dev-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Online Student Election Voting System with JWT Auth",
    "tagline": "Secure election polling platform with voter authentication and real-time tallies.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Express",
      "JWT",
      "MongoDB"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Voting Portal",
    "rating": 4.6,
    "downloads": 2124,
    "stars": 924
  },
  {
    "id": "web-dev-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Cinema Seat Booking & Movie Ticketing Web App",
    "tagline": "Interactive theater seat grid selection with booking confirmation vouchers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Express",
      "Node.js",
      "CSS3"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Ticketing Web",
    "rating": 4.6,
    "downloads": 2000,
    "stars": 800
  },
  {
    "id": "web-dev-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Weather Analytics Dashboard with Chart.js Forecasts",
    "tagline": "7-day meteorology dashboard displaying rainfall probability and wind vectors.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "JavaScript",
      "Chart.js",
      "OpenWeather API",
      "CSS3"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Dashboard Web",
    "rating": 4.8,
    "downloads": 3630,
    "stars": 330
  },
  {
    "id": "web-dev-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Notes Management App with Tags & Cloud Sync",
    "tagline": "Categorized note taking app with instant keyword search and tag filtering.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Firebase Firestore",
      "Tailwind CSS"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Cloud Notes",
    "rating": 4.6,
    "downloads": 2716,
    "stars": 816
  },
  {
    "id": "web-dev-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Fitness Workout & Calorie Tracker Web Portal",
    "tagline": "Logs gym workout routines, daily calorie targets, and body mass index progression.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Vue.js",
      "Node.js",
      "MongoDB",
      "Chart.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Health Web",
    "rating": 4.9,
    "downloads": 2643,
    "stars": 743
  },
  {
    "id": "web-dev-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "URL Shortener & Click Analytics Platform",
    "tagline": "Generates branded short links with geographic visitor analytics and QR codes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Express",
      "Redis",
      "MongoDB"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Utility SaaS",
    "rating": 4.8,
    "downloads": 3670,
    "stars": 370
  },
  {
    "id": "web-dev-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "DevConnect: Developer Social Network & Code Portfolio",
    "tagline": "Developer community platform with markdown posts, code snippets, and follower feeds.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "TailwindCSS"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Social Web Pre-Final",
    "rating": 4.8,
    "downloads": 2554,
    "stars": 654
  },
  {
    "id": "web-dev-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "MERN Stack Real-Time Collaboration Workspace",
    "tagline": "Team project workspace with task boards, integrated docs, and socket chat.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "MongoDB",
      "Express",
      "React",
      "Node.js",
      "Socket.io"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "MERN Architecture",
    "rating": 4.7,
    "downloads": 3161,
    "stars": 561
  },
  {
    "id": "web-dev-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Multi-Tenant SaaS Project Management Suite",
    "tagline": "Organizations manage teams, project sprints, timesheets, and role permissions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Enterprise SaaS",
    "rating": 4.7,
    "downloads": 3165,
    "stars": 565
  },
  {
    "id": "web-dev-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cloud Code Sandbox & Online IDE (Judge0 API)",
    "tagline": "Browser-based code editor executing Python, C++, Java, and JS in secure sandboxes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Monaco Editor",
      "Judge0 API",
      "Node.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Developer Sandbox",
    "rating": 4.7,
    "downloads": 1973,
    "stars": 773
  },
  {
    "id": "web-dev-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "E-Learning Platform with Video Streaming & Quizzes",
    "tagline": "LMS with course modules, video playback progress tracking, and certificate exports.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "Node.js",
      "AWS S3",
      "PostgreSQL"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "EdTech Web",
    "rating": 4.6,
    "downloads": 3808,
    "stars": 508
  },
  {
    "id": "web-dev-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Real-Time Collaborative Whiteboard with WebSockets",
    "tagline": "Multi-user drawing canvas with sticky notes, shapes, and instant live cursor sync.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "HTML5 Canvas",
      "Socket.io",
      "Node.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Collaboration Web",
    "rating": 4.7,
    "downloads": 1809,
    "stars": 609
  },
  {
    "id": "web-dev-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cloud File Storage & Secure Sharing (Dropbox Clone)",
    "tagline": "Uploads, organizes, and generates password-protected file sharing links.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "React",
      "AWS S3 / MinIO",
      "MongoDB"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Cloud Storage",
    "rating": 4.6,
    "downloads": 3540,
    "stars": 940
  },
  {
    "id": "web-dev-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Property Rental & Vacation Booking Portal (Airbnb Clone)",
    "tagline": "Interactive map search, calendar availability reservation, and host review system.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Express",
      "PostgreSQL",
      "Leaflet Maps"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Rental Portal",
    "rating": 4.7,
    "downloads": 2529,
    "stars": 629
  },
  {
    "id": "web-dev-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Food Delivery Aggregator with Live Driver Map Tracking",
    "tagline": "Customer menu ordering, restaurant vendor portal, and live courier GPS updates.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "MERN Stack",
      "Google Maps API",
      "Socket.io",
      "Stripe"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Delivery Platform",
    "rating": 4.8,
    "downloads": 1822,
    "stars": 622
  },
  {
    "id": "web-dev-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Digital Pharmacy & Prescription Fulfillment Portal",
    "tagline": "Patients upload doctor prescriptions and pharmacy dispatch verifies stock.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Vue.js",
      "Django REST Framework",
      "PostgreSQL"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Healthcare Web",
    "rating": 4.7,
    "downloads": 3857,
    "stars": 557
  },
  {
    "id": "web-dev-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "AI-Powered Resume Builder with PDF Export Studio",
    "tagline": "Interactive form compiling ATS-optimized resumes with customizable CSS templates.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "jsPDF",
      "OpenAI / Claude API",
      "TailwindCSS"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "AI EdTech",
    "rating": 4.8,
    "downloads": 2070,
    "stars": 870
  },
  {
    "id": "web-dev-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Freelance Service Marketplace with Milestone Escrow",
    "tagline": "Clients hire freelancers with project milestones, reviews, and secure wallet escrows.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "Express",
      "Stripe Connect",
      "MongoDB"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Marketplace Web",
    "rating": 4.8,
    "downloads": 3250,
    "stars": 650
  },
  {
    "id": "web-dev-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Crowdfunding & Venture Campaign Platform",
    "tagline": "Creators launch funding campaigns with backer rewards and progress gauges.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Node.js",
      "PostgreSQL",
      "Stripe"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "FinTech Web",
    "rating": 4.6,
    "downloads": 4292,
    "stars": 992
  },
  {
    "id": "web-dev-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Microservices E-Commerce Platform with Docker & Kubernetes",
    "tagline": "Distributed microservices (auth, catalog, cart, orders) with API gateway and Kafka.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Go",
      "Docker",
      "Kubernetes",
      "Kafka",
      "React"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Major Capstone",
    "rating": 4.6,
    "downloads": 4428,
    "stars": 428
  },
  {
    "id": "web-dev-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Collaborative Document Editor with Operational Transformation",
    "tagline": "Google Docs style concurrent editing engine handling multi-user character merges.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Operational Transformation",
      "WebSockets",
      "Node.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Algorithms Web",
    "rating": 4.7,
    "downloads": 1805,
    "stars": 605
  },
  {
    "id": "web-dev-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "High-Concurrency Flash-Sale Ticket Booking System",
    "tagline": "Engineered to survive 100k requests/sec using Redis queues and optimistic locking.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Node.js",
      "Redis",
      "PostgreSQL",
      "RabbitMQ",
      "React"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "High-Concurrency",
    "rating": 4.9,
    "downloads": 3355,
    "stars": 755
  },
  {
    "id": "web-dev-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Headless CMS with GraphQL & Next.js 14 Server Actions",
    "tagline": "Composable content management system with dynamic schema builder and GraphQL API.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js 14",
      "GraphQL",
      "PostgreSQL",
      "Prisma"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Modern Web Stack",
    "rating": 4.6,
    "downloads": 3904,
    "stars": 604
  },
  {
    "id": "web-dev-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Video Conferencing Platform with WebRTC & Mesh SFU",
    "tagline": "HD video/audio meetings with screen sharing, breakout rooms, and in-call chat.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "WebRTC",
      "Socket.io",
      "Node.js",
      "mediasoup"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "WebRTC Streaming",
    "rating": 4.8,
    "downloads": 1594,
    "stars": 394
  },
  {
    "id": "web-dev-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Enterprise Resource Planning (ERP) System for Universities",
    "tagline": "Automates admissions, student fees, faculty payroll, and examination grading.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Django",
      "React",
      "PostgreSQL",
      "Redis",
      "Celery"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "University ERP",
    "rating": 4.7,
    "downloads": 2845,
    "stars": 945
  },
  {
    "id": "web-dev-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Multi-Vendor Marketplace with Automated Merchant Payouts",
    "tagline": "Amazon-style vendor marketplace with split payments, tax calculations, and inventory.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe Connect"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Multi-Vendor Web",
    "rating": 4.8,
    "downloads": 4458,
    "stars": 458
  },
  {
    "id": "web-dev-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Low-Code Drag-and-Drop Landing Page & Website Builder",
    "tagline": "Visual drag-and-drop page builder exporting clean responsive HTML/CSS code bundles.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Dnd-Kit",
      "Tailwind CSS",
      "Node.js"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Low-Code Builder",
    "rating": 4.9,
    "downloads": 3543,
    "stars": 943
  },
  {
    "id": "web-dev-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Serverless Real-Time Analytics Dashboard (Next.js & AWS Lambda)",
    "tagline": "Processes millions of user telemetry events with serverless streaming compute.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "AWS Lambda",
      "DynamoDB",
      "ClickHouse"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Serverless Web",
    "rating": 4.8,
    "downloads": 3066,
    "stars": 466
  },
  {
    "id": "web-dev-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Automated CI/CD Pipeline & Deployment Orchestration Dashboard",
    "tagline": "Triggers git webhooks, builds Docker images, and deploys to cloud clusters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "Node.js",
      "Docker",
      "Go",
      "WebSockets"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "DevOps Web",
    "rating": 4.7,
    "downloads": 3349,
    "stars": 749
  },
  {
    "id": "web-dev-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Telemedicine Consultation Platform with HIPAA Compliance",
    "tagline": "Encrypted doctor-patient video consultations with electronic health record vaults.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "React",
      "WebRTC",
      "FastAPI",
      "PostgreSQL",
      "AWS KMS"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Healthcare Web",
    "rating": 4.8,
    "downloads": 2618,
    "stars": 718
  },
  {
    "id": "web-dev-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Decentralized Social Media Platform with Web3 Auth & IPFS",
    "tagline": "Censorship-resistant social network where posts and media are stored on IPFS.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "web-dev",
    "categoryLabel": "Web & Full Stack",
    "techStack": [
      "Next.js",
      "Ethers.js",
      "IPFS / Pinata",
      "Solidity"
    ],
    "icon": "globe",
    "color": "#6366f1",
    "badge": "Web3 Full-Stack",
    "rating": 4.9,
    "downloads": 4795,
    "stars": 795
  },
  {
    "id": "java-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Student Grading & Report System in Java CLI",
    "tagline": "Calculates subject GPA, honors rank, and generates printable terminal transcripts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "OOPs",
      "File Handling",
      "CLI"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Java Starter",
    "rating": 4.7,
    "downloads": 3525,
    "stars": 925
  },
  {
    "id": "java-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "ATM Banking Interface in Java OOPs",
    "tagline": "Object-oriented banking simulator managing deposits, cash withdrawals, and PIN checks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Classes & Objects",
      "Encapsulation",
      "CLI"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "OOPs Classic",
    "rating": 4.6,
    "downloads": 4336,
    "stars": 336
  },
  {
    "id": "java-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Scientific Calculator with Java Swing GUI",
    "tagline": "Desktop calculator with trigonometric, logarithmic, and power functions in Swing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Java Swing",
      "AWT",
      "Event Handling"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Swing GUI",
    "rating": 4.9,
    "downloads": 3191,
    "stars": 591
  },
  {
    "id": "java-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Library Book Inventory Tracker in Java",
    "tagline": "Manages book lending, returns, student accounts, and overdue fines using file I/O.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "File Streams",
      "Collections",
      "CLI"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Library Mini",
    "rating": 4.6,
    "downloads": 4428,
    "stars": 428
  },
  {
    "id": "java-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Number Guessing Game with Java Swing UI",
    "tagline": "Interactive desktop game with randomized target selection and guess counter.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Swing",
      "AWT",
      "Random"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Game Mini",
    "rating": 4.9,
    "downloads": 3151,
    "stars": 551
  },
  {
    "id": "java-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Simple Inventory Stock Tracker in Java",
    "tagline": "Adds, updates, and searches warehouse product inventory with CSV persistence.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "OOPs",
      "File Handling"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Inventory Java",
    "rating": 4.8,
    "downloads": 2898,
    "stars": 998
  },
  {
    "id": "java-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Hotel Room Reservation System in Java",
    "tagline": "Room type booking, customer registration, and checkout billing calculation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "ArrayList",
      "File I/O"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Hospitality Mini",
    "rating": 4.6,
    "downloads": 3284,
    "stars": 684
  },
  {
    "id": "java-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Contact Directory Management in Java",
    "tagline": "Stores contact names, phone numbers, and emails with binary search lookups.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Collections",
      "File I/O"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Contact Java",
    "rating": 4.8,
    "downloads": 4534,
    "stars": 534
  },
  {
    "id": "java-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Digital Clock & Stopwatch Desktop App with Swing",
    "tagline": "Multi-threaded desktop digital clock with accurate lap recording.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Swing",
      "Multithreading",
      "AWT"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Multithreaded Mini",
    "rating": 4.8,
    "downloads": 2386,
    "stars": 486
  },
  {
    "id": "java-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Electricity Billing System in Java",
    "tagline": "Computes domestic and commercial power charges based on consumption slabs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "OOPs",
      "File Handling"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Utility Java",
    "rating": 4.9,
    "downloads": 4751,
    "stars": 751
  },
  {
    "id": "java-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Quiz Application with Swing UI & Timer",
    "tagline": "Multiple-choice exam simulator with countdown timer and instant scorecards.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Swing",
      "Timer",
      "Collections"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "EdTech Java",
    "rating": 4.8,
    "downloads": 3174,
    "stars": 574
  },
  {
    "id": "java-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Vehicle Rental System in Java OOPs",
    "tagline": "Manages car/bike rental bookings, hourly tariffs, and fuel policy terms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Inheritance",
      "Polymorphism"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Rental Java",
    "rating": 4.8,
    "downloads": 3950,
    "stars": 650
  },
  {
    "id": "java-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Employee Payroll & Attendance System in Java Swing & MySQL",
    "tagline": "Desktop GUI management system tracking salary slips, tax, and biometric attendance.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Swing",
      "JDBC",
      "MySQL",
      "JasperReports"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Enterprise Mini",
    "rating": 4.7,
    "downloads": 2829,
    "stars": 929
  },
  {
    "id": "java-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Online Examination System in Java Servlets & JSP",
    "tagline": "Web exam portal with randomized question banks, automatic submission, and grading.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Servlets",
      "JSP",
      "MySQL",
      "Apache Tomcat"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Web Java",
    "rating": 4.8,
    "downloads": 3842,
    "stars": 542
  },
  {
    "id": "java-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Hospital Management System in Java & JDBC",
    "tagline": "Manages inpatient admissions, doctor duty schedules, and pharmacy dispensary.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Swing",
      "JDBC",
      "MySQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Healthcare Java",
    "rating": 4.9,
    "downloads": 4787,
    "stars": 787
  },
  {
    "id": "java-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Supermarket Point of Sale (POS) with Barcode Scanner",
    "tagline": "Retail POS billing system generating thermal receipt printouts and updating inventory.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Swing",
      "MySQL",
      "ZXing Barcode",
      "JDBC"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Retail Java",
    "rating": 4.6,
    "downloads": 2460,
    "stars": 560
  },
  {
    "id": "java-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Core Banking Portal with Account Transfer & PDF Receipts",
    "tagline": "Manages checking/savings accounts, wire transfers, and PDF statements via iText.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "JDBC",
      "MySQL",
      "iText PDF"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Banking Java",
    "rating": 4.9,
    "downloads": 3155,
    "stars": 555
  },
  {
    "id": "java-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Pharmacy Inventory & Drug Expiry Date Tracker",
    "tagline": "Alerts pharmacists of expiring medicines and manages batch supplier purchase orders.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Swing",
      "MySQL",
      "JDBC"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Pharmacy Java",
    "rating": 4.8,
    "downloads": 4146,
    "stars": 846
  },
  {
    "id": "java-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "College Admission Management Portal in Spring Boot",
    "tagline": "Student entrance application portal with merit list generation and document upload.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Thymeleaf",
      "MySQL",
      "Hibernate"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Spring Boot Starter",
    "rating": 4.7,
    "downloads": 4353,
    "stars": 353
  },
  {
    "id": "java-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Airline Flight Ticket Reservation System with Swing",
    "tagline": "Searches domestic flights, seat allocation diagrams, and generates boarding passes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Swing",
      "JDBC",
      "MySQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Aviation Java",
    "rating": 4.7,
    "downloads": 4633,
    "stars": 633
  },
  {
    "id": "java-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Car Rental Management Portal in Spring Boot",
    "tagline": "Fleet vehicle booking, insurance add-ons, and customer driver license verification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "Thymeleaf"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Rental Spring",
    "rating": 4.6,
    "downloads": 2552,
    "stars": 652
  },
  {
    "id": "java-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Hotel Room Booking & Restaurant Billing in Java",
    "tagline": "Integrated hotel room reservation and restaurant table order billing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "JavaFX",
      "MySQL",
      "JDBC"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Hospitality Java",
    "rating": 4.6,
    "downloads": 2656,
    "stars": 756
  },
  {
    "id": "java-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Gym Membership & Personal Training Manager",
    "tagline": "Tracks member subscription validity, biometric check-ins, and trainer schedules.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java Swing",
      "MySQL",
      "JDBC"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Fitness Java",
    "rating": 4.7,
    "downloads": 2605,
    "stars": 705
  },
  {
    "id": "java-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Software Bug Tracking System with Role-Based Access",
    "tagline": "Developers log issues, assign priority severity, and track patch resolutions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Thymeleaf",
      "MySQL",
      "Bootstrap"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "DevTools Java",
    "rating": 4.6,
    "downloads": 1516,
    "stars": 316
  },
  {
    "id": "java-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Student Information System in Modern JavaFX",
    "tagline": "Modern UI student record system with photo upload and course grade summaries.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "JavaFX",
      "ControlsFX",
      "SQLite / MySQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "JavaFX UI",
    "rating": 4.9,
    "downloads": 1719,
    "stars": 519
  },
  {
    "id": "java-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Spring Boot & Hibernate Microservices Banking Portal",
    "tagline": "Enterprise banking API with account microservices, transaction audits, and JWT.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java 17",
      "Spring Boot",
      "Hibernate JPA",
      "MySQL",
      "React"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Enterprise Pre-Final",
    "rating": 4.9,
    "downloads": 1871,
    "stars": 671
  },
  {
    "id": "java-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Enterprise CRM & Sales Lead Management System",
    "tagline": "Tracks client interaction histories, sales pipelines, quotations, and team KPIs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Thymeleaf",
      "PostgreSQL",
      "Docker"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "CRM Enterprise",
    "rating": 4.9,
    "downloads": 3995,
    "stars": 695
  },
  {
    "id": "java-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Supply Chain & Warehouse Logistics Management Platform",
    "tagline": "Barcoded stock pallet tracking, purchase order workflows, and shipping manifests.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "REST APIs"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Logistics Java",
    "rating": 4.6,
    "downloads": 4500,
    "stars": 500
  },
  {
    "id": "java-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "E-Commerce Backend REST API with Spring Security & JWT",
    "tagline": "Secure e-commerce API with role permissions, product catalog, cart, and orders.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Spring Security",
      "JWT",
      "MySQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Security Java",
    "rating": 4.9,
    "downloads": 2479,
    "stars": 579
  },
  {
    "id": "java-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Human Resource Management (HRMS) & Leave Portal",
    "tagline": "Automates employee onboarding, annual leave requests, and performance appraisals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "React",
      "PostgreSQL",
      "Hibernate"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "HRMS Java",
    "rating": 4.7,
    "downloads": 2097,
    "stars": 897
  },
  {
    "id": "java-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Insurance Policy & Claims Processing System",
    "tagline": "Life and motor insurance policy underwriting with automated claim document reviews.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "MySQL",
      "Camunda BPM",
      "React"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "FinTech Java",
    "rating": 4.8,
    "downloads": 1514,
    "stars": 314
  },
  {
    "id": "java-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart Fleet Vehicle Tracking & Dispatch Management",
    "tagline": "Tracks commercial delivery truck fleets with route dispatch and maintenance schedules.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "WebSockets"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Fleet Java",
    "rating": 4.8,
    "downloads": 4434,
    "stars": 434
  },
  {
    "id": "java-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Real Estate Property Listing & Online Auction Portal",
    "tagline": "Property bidding engine with live price increments and escrow validation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "WebSockets",
      "MySQL",
      "Angular"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Auction Java",
    "rating": 4.6,
    "downloads": 1788,
    "stars": 588
  },
  {
    "id": "java-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "University Central Library ERP with RFID & Barcode Gate",
    "tagline": "Automated book checkout kiosks, digital catalog search, and automated fine calculation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "MySQL",
      "JasperReports"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Library ERP",
    "rating": 4.7,
    "downloads": 2909,
    "stars": 309
  },
  {
    "id": "java-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Hotel Chain Central Reservation System",
    "tagline": "Multi-property hotel booking engine with room availability synchronization across branches.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Hibernate",
      "PostgreSQL",
      "Vue.js"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Hospitality Java",
    "rating": 4.8,
    "downloads": 2610,
    "stars": 710
  },
  {
    "id": "java-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Online Food Delivery Platform Backend in Spring Boot",
    "tagline": "Multi-restaurant menu aggregation, kitchen order routing, and delivery partner dispatch.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Redis",
      "MySQL",
      "REST"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Food Delivery",
    "rating": 4.9,
    "downloads": 3719,
    "stars": 419
  },
  {
    "id": "java-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Courier & Parcel Tracking Enterprise System",
    "tagline": "End-to-end parcel tracking from pickup hub to last-mile delivery with barcode scan logs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "PostgreSQL",
      "React",
      "Docker"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Logistics Java",
    "rating": 4.6,
    "downloads": 4100,
    "stars": 800
  },
  {
    "id": "java-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Clinical Laboratory Information System (LIMS)",
    "tagline": "Manages blood test pathology orders, auto-analyzers integration, and PDF report delivery.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "MySQL",
      "Thymeleaf"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Healthcare LIMS",
    "rating": 4.8,
    "downloads": 4790,
    "stars": 790
  },
  {
    "id": "java-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Distributed Banking Microservices with Spring Cloud & Kafka",
    "tagline": "Event-driven banking core with Eureka service discovery, resilience4j, and Kafka.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java 21",
      "Spring Cloud",
      "Apache Kafka",
      "Docker",
      "PostgreSQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Major Capstone",
    "rating": 4.6,
    "downloads": 4680,
    "stars": 680
  },
  {
    "id": "java-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "High-Throughput Stock Trading Engine with LMAX Disruptor",
    "tagline": "Processes 5 million orders/sec in Java with ring buffer lock-free concurrency.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java 21",
      "LMAX Disruptor",
      "Off-Heap Memory",
      "FinTech"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "High-Throughput",
    "rating": 4.9,
    "downloads": 2559,
    "stars": 659
  },
  {
    "id": "java-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Enterprise Identity & Access Management (OAuth2 / OpenID)",
    "tagline": "Single Sign-On (SSO) identity provider with JWT token revocation and 2FA.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Spring Authorization Server",
      "OAuth2",
      "Redis"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "IAM Security",
    "rating": 4.6,
    "downloads": 2708,
    "stars": 808
  },
  {
    "id": "java-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Healthcare EHR Interoperability Gateway with HL7 / FHIR",
    "tagline": "Interconnects hospital electronic medical records using international FHIR standards.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "HAPI FHIR",
      "Spring Boot",
      "PostgreSQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Healthcare FHIR",
    "rating": 4.7,
    "downloads": 2805,
    "stars": 905
  },
  {
    "id": "java-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Multi-Tenant SaaS Billing & Subscription Engine",
    "tagline": "Automated recurring credit card billing, invoice generation, and tier rate limiting.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Stripe API",
      "PostgreSQL",
      "Redis"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "SaaS Billing",
    "rating": 4.8,
    "downloads": 1574,
    "stars": 374
  },
  {
    "id": "java-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Distributed Batch Task Orchestrator with Spring Batch",
    "tagline": "Processes terabyte-scale financial reconciliations with multi-threaded chunk partitions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Batch",
      "Spring Boot",
      "PostgreSQL",
      "Quartz"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Batch Computing",
    "rating": 4.8,
    "downloads": 1806,
    "stars": 606
  },
  {
    "id": "java-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Real-Time Financial Fraud Detection with Apache Flink & Java",
    "tagline": "Complex event processing (CEP) detecting credit card velocity fraud in under 5ms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Apache Flink",
      "Java",
      "Kafka",
      "Redis"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Stream Analytics",
    "rating": 4.8,
    "downloads": 3286,
    "stars": 686
  },
  {
    "id": "java-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Telecom Billing & Call Detail Record (CDR) Rating Engine",
    "tagline": "High-speed telecom billing engine parsing millions of mobile data CDR records.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "Cassandra",
      "Kafka"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Telecom Java",
    "rating": 4.9,
    "downloads": 3543,
    "stars": 943
  },
  {
    "id": "java-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Automated Compliance & Audit Logging for Banking Clusters",
    "tagline": "Immutable audit trail engine for SOX and PCI-DSS financial regulatory compliance.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Elasticsearch",
      "PostgreSQL",
      "Logstash"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Compliance Java",
    "rating": 4.8,
    "downloads": 2098,
    "stars": 898
  },
  {
    "id": "java-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Airport Flight Scheduling & Smart Baggage Tracking System",
    "tagline": "Real-time baggage handling routing and runway slot scheduling optimization.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "WebSockets"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Aviation Java",
    "rating": 4.6,
    "downloads": 3984,
    "stars": 684
  },
  {
    "id": "java-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Event-Sourced E-Commerce Backend with CQRS & Axon",
    "tagline": "Command Query Responsibility Segregation (CQRS) e-commerce with Axon Framework.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Java",
      "Axon Framework",
      "Spring Boot",
      "PostgreSQL"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "CQRS Java",
    "rating": 4.7,
    "downloads": 2033,
    "stars": 833
  },
  {
    "id": "java-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Enterprise Data Governance & Catalog Platform",
    "tagline": "Discovers enterprise database schemas, lineage graphs, and data masking policies.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "java",
    "categoryLabel": "Java & Enterprise",
    "techStack": [
      "Spring Boot",
      "Apache Atlas API",
      "PostgreSQL",
      "React"
    ],
    "icon": "coffee",
    "color": "#ea580c",
    "badge": "Data Governance",
    "rating": 4.9,
    "downloads": 2215,
    "stars": 315
  },
  {
    "id": "mobile-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Simple Counter & Engineering Unit Converter App",
    "tagline": "Flutter mobile app for fast conversion between length, weight, and temperature units.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Material Design"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Flutter Starter",
    "rating": 4.8,
    "downloads": 2470,
    "stars": 570
  },
  {
    "id": "mobile-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Personal Note-Taking App with SQLite (Sqflite)",
    "tagline": "Create, edit, search, and delete personal notes stored in local mobile database.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Sqflite",
      "CRUD"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Notes App",
    "rating": 4.6,
    "downloads": 3000,
    "stars": 400
  },
  {
    "id": "mobile-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "BMI & Health Calorie Requirement Calculator",
    "tagline": "Calculates Body Mass Index, daily basal metabolic rate, and hydration goals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "StatefulWidgets"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Health Mini",
    "rating": 4.8,
    "downloads": 1974,
    "stars": 774
  },
  {
    "id": "mobile-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Flashcard Study App with Spaced Repetition",
    "tagline": "Flip flashcards to test memory retention across academic subject topics.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "LocalStorage"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "EdTech App",
    "rating": 4.7,
    "downloads": 3933,
    "stars": 633
  },
  {
    "id": "mobile-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Daily Motivational Quotes & Affirmations Generator",
    "tagline": "Displays randomized inspirational quotes with background card themes and sharing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Share Plus API"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Quotes App",
    "rating": 4.8,
    "downloads": 2982,
    "stars": 382
  },
  {
    "id": "mobile-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Tip & Group Dining Bill Splitter with Sleek UI",
    "tagline": "Calculates individual contributions and tip percentages with custom sliders.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Custom Sliders"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Finance App",
    "rating": 4.9,
    "downloads": 4411,
    "stars": 411
  },
  {
    "id": "mobile-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Tic-Tac-Toe Game with Smart AI Minimax Engine",
    "tagline": "Single-player and 2-player classic game with unbeatable AI algorithm.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Minimax Algorithm"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Game App",
    "rating": 4.9,
    "downloads": 3911,
    "stars": 611
  },
  {
    "id": "mobile-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Compass & Device Sensor Utilities App",
    "tagline": "Uses mobile magnetometer and accelerometer to display real-time navigation heading.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Sensors Plus",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Sensor App",
    "rating": 4.8,
    "downloads": 2862,
    "stars": 962
  },
  {
    "id": "mobile-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "World Clock & Timezone Converter App",
    "tagline": "Displays simultaneous global timezones with customizable city clocks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Intl Package"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Utility App",
    "rating": 4.7,
    "downloads": 1641,
    "stars": 441
  },
  {
    "id": "mobile-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Personal Expense Tracker with Pie Chart Visualizer",
    "tagline": "Logs daily spending categories and visualizes monthly spending percentages.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "FL Chart",
      "Sqflite"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Expense App",
    "rating": 4.6,
    "downloads": 4156,
    "stars": 856
  },
  {
    "id": "mobile-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Cookbook & Cooking Recipe Checklist App",
    "tagline": "Browse recipes, check off cooking steps, and calculate ingredient servings.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "JSON Assets"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Food App",
    "rating": 4.9,
    "downloads": 3703,
    "stars": 403
  },
  {
    "id": "mobile-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Daily Mood Tracker & Reflection Diary",
    "tagline": "Log daily moods with emoji tags and view monthly happiness trend graphs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Shared Preferences"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Wellness App",
    "rating": 4.6,
    "downloads": 3356,
    "stars": 756
  },
  {
    "id": "mobile-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "To-Do & Task Planner with Firebase Cloud Sync",
    "tagline": "Cross-device synced task manager with push reminders and deadline priorities.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Dart",
      "Firebase Firestore",
      "Auth"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Cloud App",
    "rating": 4.6,
    "downloads": 1644,
    "stars": 444
  },
  {
    "id": "mobile-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Weather Forecast App with 7-Day Visual Charts",
    "tagline": "Live weather forecasts with animated radar visuals and geolocation lookups.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "OpenWeather API",
      "Geolocator",
      "BLoC"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Weather App",
    "rating": 4.7,
    "downloads": 3761,
    "stars": 461
  },
  {
    "id": "mobile-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Offline Music Player with Equalizer & Playlists",
    "tagline": "Scans local MP3 audio files, creates playlists, and renders animated soundbars.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Just Audio",
      "Audio Service",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Media App",
    "rating": 4.6,
    "downloads": 1980,
    "stars": 780
  },
  {
    "id": "mobile-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Quiz Master App with Global Online Leaderboard",
    "tagline": "Timed trivia quiz competing with other students for top ranking on Firebase.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Firebase",
      "State Management (Provider)"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Quiz App",
    "rating": 4.8,
    "downloads": 1938,
    "stars": 738
  },
  {
    "id": "mobile-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "News Aggregator App with Category Feed & Bookmarks",
    "tagline": "Fetches global breaking headlines with offline reading and search filters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "NewsAPI",
      "HTTP",
      "Hive Storage"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "News App",
    "rating": 4.9,
    "downloads": 4039,
    "stars": 739
  },
  {
    "id": "mobile-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Habit Builder with Scheduled Push Notifications",
    "tagline": "Builds productive habits with streak visualizers and daily local notifications.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Flutter Local Notifications",
      "Hive"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Habit App",
    "rating": 4.9,
    "downloads": 3663,
    "stars": 363
  },
  {
    "id": "mobile-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Fitness Step Counter & Pedometer with Google Fit",
    "tagline": "Tracks daily step goals, distance covered, and burned calories using mobile pedometer.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Pedometer API",
      "Google Fit API"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Fitness App",
    "rating": 4.9,
    "downloads": 2323,
    "stars": 423
  },
  {
    "id": "mobile-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Recipe Sharing Social App with Camera Photo Upload",
    "tagline": "Foodies publish homemade recipes, like posts, and bookmark cooking guides.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Firebase Storage",
      "Firestore",
      "Image Picker"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Social App",
    "rating": 4.9,
    "downloads": 3303,
    "stars": 703
  },
  {
    "id": "mobile-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "4K Wallpaper Explorer & Download Gallery",
    "tagline": "Browse HD wallpapers by category and set home/lock screen backgrounds.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Unsplash API",
      "Wallpaper Manager"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Gallery App",
    "rating": 4.9,
    "downloads": 4135,
    "stars": 835
  },
  {
    "id": "mobile-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "QR & Barcode Scanner with Custom Card Generator",
    "tagline": "Fast optical scanning of QR codes, Wi-Fi keys, and business contact vCards.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Mobile Scanner",
      "QR Flutter"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Utility Scanner",
    "rating": 4.6,
    "downloads": 3308,
    "stars": 708
  },
  {
    "id": "mobile-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Movie Discovery App with TMDB API & Trait Reviews",
    "tagline": "Explore trending movies, watch trailers, and read community user reviews.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "TMDB API",
      "Riverpod",
      "CachedNetworkImage"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Movie App",
    "rating": 4.9,
    "downloads": 1911,
    "stars": 711
  },
  {
    "id": "mobile-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Language Learning Flashcards with Audio Pronunciation",
    "tagline": "Master foreign vocabulary with interactive audio cards and pronunciation tests.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Flutter TTS",
      "AudioPlayers",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "EdTech App",
    "rating": 4.8,
    "downloads": 3726,
    "stars": 426
  },
  {
    "id": "mobile-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Campus Events & College Fest Companion App",
    "tagline": "Students register for college workshops, view schedules, and scan entry passes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Firebase Auth",
      "Firestore",
      "QR Scanner"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Campus App",
    "rating": 4.6,
    "downloads": 4276,
    "stars": 976
  },
  {
    "id": "mobile-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "TeleHealth: Doctor Appointment & Video Consultation App",
    "tagline": "Book specialist doctor appointments with WebRTC video calling and prescription vault.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "WebRTC",
      "Firebase",
      "Agora API",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Mobile Pre-Final",
    "rating": 4.6,
    "downloads": 3248,
    "stars": 648
  },
  {
    "id": "mobile-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "E-Commerce Mobile App with Razorpay & Order Tracking",
    "tagline": "Full-featured shopping app with product variations, cart, and payment gateway.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Node.js Backend",
      "Razorpay / Stripe",
      "MongoDB"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "E-Commerce Mobile",
    "rating": 4.9,
    "downloads": 3303,
    "stars": 703
  },
  {
    "id": "mobile-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Real-Time Chat & Voice Messaging App (WhatsApp Clone)",
    "tagline": "One-on-one and group messaging with voice notes, image sharing, and read receipts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Firebase Firestore",
      "Cloud Functions",
      "Agora"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Chat Mobile",
    "rating": 4.9,
    "downloads": 4859,
    "stars": 859
  },
  {
    "id": "mobile-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Food Delivery App with Live Driver GPS Tracking",
    "tagline": "Browse restaurant menus, place orders, and track courier movement on live maps.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Google Maps SDK",
      "Node.js",
      "Socket.io"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Food Delivery",
    "rating": 4.8,
    "downloads": 4754,
    "stars": 754
  },
  {
    "id": "mobile-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Emergency Blood Donation & SOS Donor Alert App",
    "tagline": "Connects emergency blood seekers with verified nearby donors via push alerts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Geofencing",
      "Firebase",
      "Twilio SMS"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Emergency App",
    "rating": 4.9,
    "downloads": 3295,
    "stars": 695
  },
  {
    "id": "mobile-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Ridesharing Passenger & Driver Matching App (Uber Clone)",
    "tagline": "Request rides with fare estimates, dynamic driver dispatch, and route mapping.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Google Maps",
      "Firebase",
      "Node.js"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Rideshare App",
    "rating": 4.7,
    "downloads": 3321,
    "stars": 721
  },
  {
    "id": "mobile-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Smart Home Controller App with MQTT & Bluetooth",
    "tagline": "Toggle room lights, thermostats, and surveillance cameras via local & cloud MQTT.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "MQTT Client",
      "Flutter Blue Plus",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Smart Home App",
    "rating": 4.6,
    "downloads": 3392,
    "stars": 792
  },
  {
    "id": "mobile-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Personal Finance & Stock Investment Portfolio Tracker",
    "tagline": "Live stock and mutual fund tracking with profit/loss analytics and financial charts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Yahoo Finance API",
      "FL Chart",
      "Hive"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "FinTech Mobile",
    "rating": 4.8,
    "downloads": 3770,
    "stars": 470
  },
  {
    "id": "mobile-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "College LMS Student Companion with Offline Assignment Cache",
    "tagline": "Access university course materials, submit assignments, and view attendance stats.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "REST API",
      "Sqflite",
      "Dio HTTP Client"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Education App",
    "rating": 4.6,
    "downloads": 3764,
    "stars": 464
  },
  {
    "id": "mobile-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Augmented Reality (AR) Furniture Placement App",
    "tagline": "Preview 3D virtual furniture models in your living room using ARCore / ARKit.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "ARCore / ARKit",
      "Unity / Sceneform",
      "3D Models"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "AR Mobile",
    "rating": 4.7,
    "downloads": 2541,
    "stars": 641
  },
  {
    "id": "mobile-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Crypto Portfolio Tracker with Real-Time Price Alerts",
    "tagline": "Tracks cryptocurrency holdings across exchanges with price surge push alerts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "CoinGecko API",
      "WebSockets",
      "Riverpod"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Crypto Mobile",
    "rating": 4.6,
    "downloads": 2004,
    "stars": 804
  },
  {
    "id": "mobile-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Travel Itinerary Planner with Offline Vector Maps",
    "tagline": "Plan multi-city vacation schedules with offline downloadable maps and packing lists.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Mapbox SDK",
      "SQLite",
      "OpenTripMap"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Travel App",
    "rating": 4.7,
    "downloads": 4913,
    "stars": 913
  },
  {
    "id": "mobile-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Audio Book & Podcast Player with Variable Speed & Sleep Timer",
    "tagline": "Stream and download podcast episodes with chapter markers and custom speed.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Audio Service",
      "Just Audio",
      "Firebase"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Audio App",
    "rating": 4.9,
    "downloads": 4591,
    "stars": 591
  },
  {
    "id": "mobile-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "AI-Powered Personal Fitness Coach with Pose Estimation",
    "tagline": "On-device camera posture tracking counting workout repetitions and correcting form.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "TensorFlow Lite",
      "MediaPipe Pose",
      "BLoC"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Major Capstone",
    "rating": 4.9,
    "downloads": 4931,
    "stars": 931
  },
  {
    "id": "mobile-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Offline-First Enterprise Field Telemetry App with Couchbase",
    "tagline": "Field engineering data entry with peer-to-peer mesh sync and conflict resolution.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Couchbase Lite",
      "P2P Sync",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Offline-First",
    "rating": 4.6,
    "downloads": 1624,
    "stars": 424
  },
  {
    "id": "mobile-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Mental Health AI Companion with Voice CBT Journaling",
    "tagline": "Cognitive behavioral therapy journal with on-device speech sentiment analysis.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Whisper AI",
      "LLaMA Mobile",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Mental Health AI",
    "rating": 4.7,
    "downloads": 4285,
    "stars": 985
  },
  {
    "id": "mobile-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "B2B Wholesale Marketplace App with In-App Escrow",
    "tagline": "B2B trade platform with bulk RFQ requests, contract negotiation chat, and escrow.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Node.js",
      "MongoDB",
      "Stripe Connect"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "B2B Mobile",
    "rating": 4.7,
    "downloads": 4585,
    "stars": 585
  },
  {
    "id": "mobile-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Plant Disease Identification with On-Device TensorFlow Lite",
    "tagline": "Offline agricultural camera scanner identifying 38 crop leaf infections instantly.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "TensorFlow Lite",
      "Camera Plugin",
      "Dart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "AgriTech Mobile",
    "rating": 4.8,
    "downloads": 2826,
    "stars": 926
  },
  {
    "id": "mobile-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Real-Time Multiplayer Trivia Quiz App with WebSockets",
    "tagline": "Synchronous live multiplayer quiz tournaments with server-authoritative scoring.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "WebSockets",
      "Node.js",
      "Redis"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Gaming Mobile",
    "rating": 4.6,
    "downloads": 4616,
    "stars": 616
  },
  {
    "id": "mobile-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Smart City Citizen Civic Reporting App with Geo-Tagging",
    "tagline": "Citizens report potholes, garbage, and broken streetlights with GPS verification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Google Maps",
      "Firebase",
      "FastAPI"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Smart City Mobile",
    "rating": 4.8,
    "downloads": 4990,
    "stars": 990
  },
  {
    "id": "mobile-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Non-Custodial Web3 Crypto Wallet App with Biometric Auth",
    "tagline": "Manage ERC-20 / Polygon tokens with private key encryption and biometric signing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Web3dart",
      "Bip39",
      "Biometric Auth"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Web3 Mobile",
    "rating": 4.7,
    "downloads": 3813,
    "stars": 513
  },
  {
    "id": "mobile-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Emergency Disaster Response & Offline Mesh Locator",
    "tagline": "Locate emergency shelters and broadcast SOS beacons over Bluetooth mesh network.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Nearby Connections API",
      "Offline Maps"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Disaster Tech",
    "rating": 4.6,
    "downloads": 3704,
    "stars": 404
  },
  {
    "id": "mobile-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Vehicle OBD-II Telemetry & Real-Time Engine Diagnostics",
    "tagline": "Connects to car OBD-II Bluetooth scanner to read engine RPM, fault codes, and fuel.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "OBD-II Protocol",
      "Bluetooth Serial",
      "FL Chart"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Automotive App",
    "rating": 4.8,
    "downloads": 2010,
    "stars": 810
  },
  {
    "id": "mobile-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "AI Foreign Language Pronunciation Coach with Speech Feedback",
    "tagline": "Evaluates student spoken foreign accent accuracy using phoneme matching algorithms.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "Speech-to-Text",
      "Audio Spectrograms",
      "FastAPI"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "EdTech AI",
    "rating": 4.8,
    "downloads": 2802,
    "stars": 902
  },
  {
    "id": "mobile-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Visually Impaired Assistance App with Real-Time Object Narration",
    "tagline": "Speaks aloud nearby obstacles, currencies, and printed text in real-time.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "mobile",
    "categoryLabel": "Mobile Flutter",
    "techStack": [
      "Flutter",
      "YOLOv8 Mobile",
      "Text-to-Speech",
      "OpenCV"
    ],
    "icon": "smartphone",
    "color": "#ec4899",
    "badge": "Accessibility AI",
    "rating": 4.6,
    "downloads": 4468,
    "stars": 468
  },
  {
    "id": "blockchain-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "SHA-256 Proof-of-Work Blockchain Demo in Python",
    "tagline": "Terminal simulator illustrating hashing, difficulty nonce, and block chaining.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "SHA-256",
      "Cryptography",
      "CLI"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Blockchain Starter",
    "rating": 4.9,
    "downloads": 3867,
    "stars": 567
  },
  {
    "id": "blockchain-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Simple Hash Pointer & Block Structure Simulator",
    "tagline": "Inspects block tampering and shows how altering past data breaks hash pointers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "CryptoJS",
      "HTML5/CSS3"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Hash Mechanics",
    "rating": 4.6,
    "downloads": 3676,
    "stars": 376
  },
  {
    "id": "blockchain-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Public-Private Key Pair Generator & Signature Verifier",
    "tagline": "Generates ECDSA key pairs and signs digital messages with verification tools.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "ECDSA",
      "Cryptography"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Cryptography Mini",
    "rating": 4.8,
    "downloads": 3158,
    "stars": 558
  },
  {
    "id": "blockchain-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Merkle Tree Root Hash Calculator for Transactions",
    "tagline": "Calculates binary Merkle tree roots and proves transaction inclusion.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "Binary Trees",
      "SHA-256"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Merkle Trees",
    "rating": 4.6,
    "downloads": 3596,
    "stars": 996
  },
  {
    "id": "blockchain-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Decentralized Voting Prototype in Python",
    "tagline": "Simulates decentralized consensus voting ledger across 4 local nodes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "Flask",
      "Networking",
      "JSON"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Voting Mini",
    "rating": 4.9,
    "downloads": 3951,
    "stars": 651
  },
  {
    "id": "blockchain-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Simple Peer-to-Peer Block Explorer CLI",
    "tagline": "Inspects block height, transaction hashes, gas limits, and peer connections.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "CLI",
      "Web3.py"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Explorer Mini",
    "rating": 4.8,
    "downloads": 2714,
    "stars": 814
  },
  {
    "id": "blockchain-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Paper Crypto Wallet Generator with QR Codes",
    "tagline": "Generates printable cold paper wallets with public address and private key QR codes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "QRCode.js",
      "HTML5"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Paper Wallet",
    "rating": 4.8,
    "downloads": 4786,
    "stars": 786
  },
  {
    "id": "blockchain-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Blockchain Gas Fee & Gwei Estimator Tool",
    "tagline": "Calculates Ethereum transaction cost estimates based on network congestion.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "Ethers.js",
      "REST API"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Gas Estimator",
    "rating": 4.8,
    "downloads": 2538,
    "stars": 638
  },
  {
    "id": "blockchain-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Genesis Block Creator & Ledger Inspector",
    "tagline": "Create custom blockchain genesis blocks with genesis coin allocation parameters.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "JSON",
      "CLI"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Genesis Mini",
    "rating": 4.8,
    "downloads": 4462,
    "stars": 462
  },
  {
    "id": "blockchain-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Crypto Exchange Arbitrage Profit Calculator",
    "tagline": "Scrapes price spreads across crypto exchanges to identify arbitrage opportunities.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "REST APIs",
      "Pandas"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Arbitrage Mini",
    "rating": 4.8,
    "downloads": 3566,
    "stars": 966
  },
  {
    "id": "blockchain-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Solidity Smart Contract Syntax & ABI Inspector",
    "tagline": "Validates smart contract syntax and parses Application Binary Interfaces (ABI).",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "Solc Compiler",
      "HTML5"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "DevTools Web3",
    "rating": 4.7,
    "downloads": 4593,
    "stars": 593
  },
  {
    "id": "blockchain-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Byzantine Generals Problem Consensus Simulator",
    "tagline": "Visualizes how 33% faulty or traitorous nodes impact Byzantine fault tolerance.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "HTML5 Canvas",
      "Algorithms"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Consensus Demo",
    "rating": 4.8,
    "downloads": 3378,
    "stars": 778
  },
  {
    "id": "blockchain-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "ERC-20 Custom Token & Faucet on Sepolia Testnet",
    "tagline": "Deploy custom minted cryptocurrency token on Ethereum testnet with web faucet.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Hardhat",
      "Ethers.js",
      "Sepolia"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Token DApp",
    "rating": 4.8,
    "downloads": 4426,
    "stars": 426
  },
  {
    "id": "blockchain-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Decentralized Crowdfunding Smart Contract in Solidity",
    "tagline": "Kickstarter-style campaign contract refunding backers if goal is not met in time.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "React",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Crowdfund DApp",
    "rating": 4.7,
    "downloads": 1725,
    "stars": 525
  },
  {
    "id": "blockchain-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Decentralized Fair Lottery with Chainlink VRF",
    "tagline": "Transparent lottery choosing verifiable random winners via Chainlink VRF oracle.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Chainlink VRF",
      "Hardhat",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Oracle DApp",
    "rating": 4.9,
    "downloads": 4731,
    "stars": 731
  },
  {
    "id": "blockchain-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Escrow Smart Contract for Peer-to-Peer Goods Trading",
    "tagline": "Protects buyers and sellers by locking funds until goods delivery confirmation.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "Web3.js",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Escrow Web3",
    "rating": 4.8,
    "downloads": 2166,
    "stars": 966
  },
  {
    "id": "blockchain-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Peer-to-Peer Vehicle Rental Smart Contract",
    "tagline": "Smart contract locking security deposit and tracking rental start/end timestamps.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Hardhat",
      "Ethers.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Rental DApp",
    "rating": 4.7,
    "downloads": 1597,
    "stars": 397
  },
  {
    "id": "blockchain-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Digital Land Registry System on Ethereum Testnet",
    "tagline": "Maintains tamper-proof land parcel deed ownership and transfer records.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "React",
      "Truffle",
      "Ganache"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "GovTech Web3",
    "rating": 4.9,
    "downloads": 4915,
    "stars": 915
  },
  {
    "id": "blockchain-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Intellectual Property & Copyright Timestamp Registry",
    "tagline": "Authors prove priority date of original art and manuscripts by hashing to blockchain.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "IPFS",
      "Ethers.js",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Copyright DApp",
    "rating": 4.9,
    "downloads": 4923,
    "stars": 923
  },
  {
    "id": "blockchain-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Decentralized Tip Jar with MetaMask Integration",
    "tagline": "Allow website visitors to send ETH tips directly to content creators via Web3.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "HTML5",
      "JavaScript",
      "MetaMask",
      "Ethers.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Web3 UI",
    "rating": 4.6,
    "downloads": 4148,
    "stars": 848
  },
  {
    "id": "blockchain-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Academic Certificate Verification on Polygon Network",
    "tagline": "Universities issue tamper-evident diplomas that employers verify in 1 click.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Polygon PoS",
      "Ethers.js",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "EdTech Web3",
    "rating": 4.9,
    "downloads": 3487,
    "stars": 887
  },
  {
    "id": "blockchain-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Multi-Signature Crypto Wallet Smart Contract (2-of-3)",
    "tagline": "Requires multiple designated signers to approve high-value crypto fund transfers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Hardhat",
      "React",
      "Ethers.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "MultiSig Web3",
    "rating": 4.7,
    "downloads": 2449,
    "stars": 549
  },
  {
    "id": "blockchain-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Subscription Payment Contract with Recurring Deductions",
    "tagline": "Automates monthly crypto subscription charges with subscriber cancel rights.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "SaaS Web3",
    "rating": 4.6,
    "downloads": 1724,
    "stars": 524
  },
  {
    "id": "blockchain-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Decentralized Whitelist & Token Airdrop Smart Contract",
    "tagline": "Merkle tree verification for gas-efficient token airdrops to eligible community wallets.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "MerkleProof.sol",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Airdrop DApp",
    "rating": 4.8,
    "downloads": 3810,
    "stars": 510
  },
  {
    "id": "blockchain-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "On-Chain Charity Donation Tracking & Fund Allocator",
    "tagline": "Donors trace exactly how non-profit disaster relief funds are disbursed to suppliers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "React",
      "Ethers.js",
      "Sepolia"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Charity Web3",
    "rating": 4.9,
    "downloads": 4135,
    "stars": 835
  },
  {
    "id": "blockchain-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "CertiChain: Tamper-Proof Academic Transcripts on Ethereum",
    "tagline": "Institutional degree issuance with digital signatures, QR codes, and Etherscan proof.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "IPFS",
      "React",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Web3 Pre-Final",
    "rating": 4.8,
    "downloads": 3958,
    "stars": 658
  },
  {
    "id": "blockchain-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "NFT Marketplace for Digital Art with IPFS Storage",
    "tagline": "Mint, buy, sell, and auction ERC-721 digital collectibles with IPFS metadata.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "ERC-721",
      "IPFS / Pinata",
      "Next.js",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "NFT Marketplace",
    "rating": 4.9,
    "downloads": 2555,
    "stars": 655
  },
  {
    "id": "blockchain-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Decentralized Anonymous Voting with Zero-Knowledge Proofs",
    "tagline": "Secret ballot voting on-chain verifying voter eligibility without revealing voter identity.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Circom",
      "snarkjs",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "ZK Voting",
    "rating": 4.7,
    "downloads": 2041,
    "stars": 841
  },
  {
    "id": "blockchain-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Pharmaceutical Supply Chain Provenance Tracker",
    "tagline": "Prevents counterfeit drugs by scanning RFID hash records at every transit checkpoint.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Polygon",
      "IPFS",
      "React",
      "Node.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Supply Chain Web3",
    "rating": 4.7,
    "downloads": 2345,
    "stars": 445
  },
  {
    "id": "blockchain-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Decentralized Self-Sovereign Identity (DID) Portal",
    "tagline": "Users control their own verifiable credentials (identity, KYC, degrees) with W3C DIDs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "W3C DID",
      "Ethers.js",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Identity Web3",
    "rating": 4.9,
    "downloads": 2499,
    "stars": 599
  },
  {
    "id": "blockchain-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "DeFi Automated Market Maker (AMM) Uniswap V2 Clone",
    "tagline": "Constant product formula (x*y=k) decentralized token swap with liquidity pools.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Hardhat",
      "React",
      "Ethers.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "DeFi AMM",
    "rating": 4.6,
    "downloads": 4416,
    "stars": 416
  },
  {
    "id": "blockchain-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Real Estate Tokenization & Fractional Ownership DApp",
    "tagline": "Tokenizes commercial real estate into fractional tokens with automated rental dividends.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "ERC-20",
      "Next.js",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Tokenization",
    "rating": 4.7,
    "downloads": 4645,
    "stars": 645
  },
  {
    "id": "blockchain-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Decentralized Autonomous Organization (DAO) Governance",
    "tagline": "Community token holders submit governance proposals, vote on-chain, and trigger timelocks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "OpenZeppelin Governor",
      "React",
      "Hardhat"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "DAO Governance",
    "rating": 4.8,
    "downloads": 1550,
    "stars": 350
  },
  {
    "id": "blockchain-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Carbon Credit Trading & Offset Marketplace on Polygon",
    "tagline": "Certifies and trades verified carbon offset credits with retirement burn certificates.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Polygon PoS",
      "React",
      "IPFS"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Climate Web3",
    "rating": 4.7,
    "downloads": 4181,
    "stars": 881
  },
  {
    "id": "blockchain-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Blockchain Electronic Health Records (EHR) Consent Vault",
    "tagline": "Patients grant temporary decryption access to doctors using smart contract permission keys.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "IPFS",
      "Asymmetric Encryption",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Healthcare Web3",
    "rating": 4.9,
    "downloads": 3411,
    "stars": 811
  },
  {
    "id": "blockchain-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Parametric Weather Insurance Smart Contract with Oracles",
    "tagline": "Auto-pays farmers insurance claims when Chainlink weather oracle reports drought.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Chainlink Oracles",
      "Hardhat",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Parametric DeFi",
    "rating": 4.8,
    "downloads": 2714,
    "stars": 814
  },
  {
    "id": "blockchain-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Web3 Freelance Job Marketplace with Milestone Escrow",
    "tagline": "Smart contract held milestones released upon client cryptographic signature verification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "React",
      "Node.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Freelance Web3",
    "rating": 4.9,
    "downloads": 2483,
    "stars": 583
  },
  {
    "id": "blockchain-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Decentralized Storage Network Client (IPFS / Filecoin)",
    "tagline": "Uploads encrypted file chunks across distributed peer nodes with retrieval proofs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "JavaScript",
      "IPFS / Helia",
      "Filecoin API",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Storage Web3",
    "rating": 4.6,
    "downloads": 3908,
    "stars": 608
  },
  {
    "id": "blockchain-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Cross-Chain Asset Bridge Protocol with Relayer Nodes",
    "tagline": "Locks tokens on Ethereum and mints wrapped synthetic assets on Polygon via relayer consensus.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Ethers.js",
      "Node.js Relayer",
      "Hardhat",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Major Capstone",
    "rating": 4.9,
    "downloads": 4755,
    "stars": 755
  },
  {
    "id": "blockchain-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Optimistic Rollup Layer-2 Transaction Sequencer",
    "tagline": "Bundles off-chain transactions into compressed fraud-provable state roots on Layer-1.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Rust",
      "Solidity",
      "TypeScript",
      "Cryptography"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Layer-2 Rollup",
    "rating": 4.7,
    "downloads": 4401,
    "stars": 401
  },
  {
    "id": "blockchain-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Decentralized Collateralized Lending Protocol (Aave Clone)",
    "tagline": "Crypto collateral deposit, borrow interest rate models, and automated liquidation bots.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Hardhat",
      "Chainlink Price Feeds",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "DeFi Lending",
    "rating": 4.6,
    "downloads": 3972,
    "stars": 672
  },
  {
    "id": "blockchain-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Zero-Knowledge Private Transaction Protocol (Tornado Demo)",
    "tagline": "Private token mixer using zk-SNARKs proofs and Merkle tree root verification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Circom",
      "snarkjs",
      "Solidity",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "ZK Privacy",
    "rating": 4.8,
    "downloads": 2350,
    "stars": 450
  },
  {
    "id": "blockchain-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Decentralized Perpetual Futures DEX with On-Chain Orderbook",
    "tagline": "Trade crypto derivatives with up to 20x leverage, liquidation engine, and funding rates.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Pyth Oracle",
      "Hardhat",
      "Next.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Perpetuals DEX",
    "rating": 4.8,
    "downloads": 3662,
    "stars": 362
  },
  {
    "id": "blockchain-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Algorithmic Stablecoin Protocol with Collateralized Debt (CDP)",
    "tagline": "Maintains $1.00 peg using overcollateralized vault minting and arbitrage stabilization.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "Chainlink",
      "Hardhat",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Stablecoin Protocol",
    "rating": 4.6,
    "downloads": 3804,
    "stars": 504
  },
  {
    "id": "blockchain-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "MEV (Maximal Extractable Value) Arbitrage Bot & Simulator",
    "tagline": "Simulates mempool transaction ordering, sandwich attacks, and DEX arbitrage.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "Web3.py",
      "Geth Mempool",
      "Solidity"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "MEV Analytics",
    "rating": 4.6,
    "downloads": 3848,
    "stars": 548
  },
  {
    "id": "blockchain-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Blockchain-Anchored Smart Grid Energy Billing & Meter Auth",
    "tagline": "IoT smart meter telemetry cryptographically signed and billed on lightweight EVM.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "ESP32",
      "Web3.js",
      "MQTT"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Energy Blockchain",
    "rating": 4.9,
    "downloads": 4407,
    "stars": 407
  },
  {
    "id": "blockchain-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Account Abstraction (ERC-4337) Smart Contract Wallet",
    "tagline": "Next-gen crypto wallet with social recovery, gas fee sponsorship, and bundled transactions.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "ERC-4337",
      "UserOperation",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Account Abstraction",
    "rating": 4.8,
    "downloads": 3566,
    "stars": 966
  },
  {
    "id": "blockchain-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Decentralized Social Graph Protocol (Lens Clone)",
    "tagline": "On-chain follower profiles, content collect NFTs, and open social feeds on EVM.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "ERC-721",
      "Polygon",
      "Next.js"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Social Graph",
    "rating": 4.7,
    "downloads": 1905,
    "stars": 705
  },
  {
    "id": "blockchain-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Sovereign Identity Protocol for Displaced Refugees on IPFS",
    "tagline": "Biometrically anchored decentralized identity resistant to state authority censorship.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Solidity",
      "IPFS",
      "Zero-Knowledge",
      "React"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Humanitarian Web3",
    "rating": 4.8,
    "downloads": 3502,
    "stars": 902
  },
  {
    "id": "blockchain-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Automated Smart Contract Security Vulnerability Scanner",
    "tagline": "Static bytecode analysis engine detecting reentrancy, integer overflow, and tx.origin bugs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "blockchain",
    "categoryLabel": "Blockchain & Web3",
    "techStack": [
      "Python",
      "Slither AST",
      "Solidity",
      "FastAPI"
    ],
    "icon": "blocks",
    "color": "#a855f7",
    "badge": "Security Auditing",
    "rating": 4.8,
    "downloads": 3906,
    "stars": 606
  },
  {
    "id": "cybersecurity-01",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Caesar Cipher & Multi-Algorithm Text Encryption Tool",
    "tagline": "Encrypts and decrypts text using Caesar, Vigen\u00e8re, and Base64 cipher routines.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Cryptography",
      "CLI",
      "File I/O"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Security Starter",
    "rating": 4.9,
    "downloads": 1563,
    "stars": 363
  },
  {
    "id": "cybersecurity-02",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Multi-Threaded TCP Port Scanner with Socket Programming",
    "tagline": "Scans target IP addresses for open TCP/UDP ports and banners in seconds.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Sockets",
      "Multithreading",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Port Scanner",
    "rating": 4.6,
    "downloads": 1908,
    "stars": 708
  },
  {
    "id": "cybersecurity-03",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Password Strength & Entropy Calculator with Crack Time",
    "tagline": "Evaluates password entropy bits, dictionary vulnerability, and estimated brute-force time.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Regular Expressions",
      "Tkinter",
      "Math"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Password Tool",
    "rating": 4.6,
    "downloads": 1552,
    "stars": 352
  },
  {
    "id": "cybersecurity-04",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "File Hash Integrity Checker (MD5, SHA-1, SHA-256)",
    "tagline": "Calculates cryptographic file hashes to verify downloaded software authenticity.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "hashlib",
      "File I/O",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Integrity Tool",
    "rating": 4.9,
    "downloads": 1879,
    "stars": 679
  },
  {
    "id": "cybersecurity-05",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Defensive Keylogger Detection & Process Analyzer",
    "tagline": "Monitors active Windows/Linux background hook processes to flag spyware hooks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "psutil",
      "Win32API",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Defensive Tool",
    "rating": 4.8,
    "downloads": 2726,
    "stars": 826
  },
  {
    "id": "cybersecurity-06",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Network Packet Header Decoder & IP Analyzer",
    "tagline": "Captures raw socket Ethernet frames and displays source/destination IP breakdowns.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "struct",
      "Sockets",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Packet Decoder",
    "rating": 4.7,
    "downloads": 4045,
    "stars": 745
  },
  {
    "id": "cybersecurity-07",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Steganography: Hide Secret Text Inside Image Pixels",
    "tagline": "Embeds encrypted secret messages into PNG image LSB (Least Significant Bit) pixels.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Pillow (PIL)",
      "LSB Algorithm"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Steganography",
    "rating": 4.8,
    "downloads": 4170,
    "stars": 870
  },
  {
    "id": "cybersecurity-08",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Brute-Force Password Cracker Simulation for Education",
    "tagline": "Demonstrates dictionary and brute-force cracking resistance for hashed credentials.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "hashlib",
      "Multiprocessing"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Educational Tool",
    "rating": 4.8,
    "downloads": 3126,
    "stars": 526
  },
  {
    "id": "cybersecurity-09",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Secure File Shredder & Multi-Pass Data Wiper",
    "tagline": "Permanently destroys sensitive files by overwriting sectors with DoD 5220.22-M random passes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "os",
      "random",
      "File System"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "File Sanitization",
    "rating": 4.6,
    "downloads": 4840,
    "stars": 840
  },
  {
    "id": "cybersecurity-10",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Phishing URL Detector with Heuristic Rule Engine",
    "tagline": "Identifies fraudulent domain impersonations using typosquatting and suspicious IP heuristics.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "urllib",
      "Regex",
      "Flask"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Anti-Phishing",
    "rating": 4.8,
    "downloads": 1910,
    "stars": 710
  },
  {
    "id": "cybersecurity-11",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "Two-Factor Authentication (TOTP) Generator & Verifier",
    "tagline": "Implements RFC 6238 time-based one-time password generator compatible with Google Authenticator.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "pyotp",
      "QRCode",
      "HMAC"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "2FA Security",
    "rating": 4.7,
    "downloads": 1637,
    "stars": 437
  },
  {
    "id": "cybersecurity-12",
    "year": 1,
    "yearLabel": "1st Year Project",
    "difficulty": "Easy",
    "title": "SSH Server Failed Login & Brute-Force Monitor",
    "tagline": "Parses auth.log in real-time to alert system administrators of SSH brute-force attempts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Regex",
      "Log Parsing",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Log Defense",
    "rating": 4.8,
    "downloads": 3250,
    "stars": 650
  },
  {
    "id": "cybersecurity-13",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Web Application Firewall (WAF) Prototype in Python",
    "tagline": "Reverse proxy inspection layer blocking SQLi, XSS, and path traversal HTTP attacks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "FastAPI",
      "Regex",
      "HTTP Proxy"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "WAF Defense",
    "rating": 4.9,
    "downloads": 4835,
    "stars": 835
  },
  {
    "id": "cybersecurity-14",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Network Vulnerability Scanner (Mini Nessus Clone)",
    "tagline": "Scans local subnet for outdated service versions, default credentials, and open ports.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Nmap Engine",
      "Sockets",
      "HTML Reports"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Vuln Scanner",
    "rating": 4.7,
    "downloads": 3605,
    "stars": 305
  },
  {
    "id": "cybersecurity-15",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Automated SQL Injection & XSS Vulnerability Tester",
    "tagline": "Fuzzes web input parameters with payload dictionaries to identify OWASP Top 10 flaws.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Requests",
      "BeautifulSoup4",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "OWASP Testing",
    "rating": 4.6,
    "downloads": 3500,
    "stars": 900
  },
  {
    "id": "cybersecurity-16",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "SSH & FTP Honeypot for Intrusion Behavior Logging",
    "tagline": "Deploys decoy fake server services to record hacker IP addresses and keystroke telemetry.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Paramiko",
      "Sockets",
      "JSON Logging"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Honeypot Tech",
    "rating": 4.6,
    "downloads": 3984,
    "stars": 684
  },
  {
    "id": "cybersecurity-17",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "ARP Spoofing & Man-in-the-Middle (MITM) Detector",
    "tagline": "Monitors local subnet ARP cache poison tables to alert users of eavesdropping attacks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Scapy",
      "Network Layer",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Network Defense",
    "rating": 4.6,
    "downloads": 2660,
    "stars": 760
  },
  {
    "id": "cybersecurity-18",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Secure End-to-End Encrypted Chat with RSA & AES",
    "tagline": "Client-server terminal chat encrypting session messages using 2048-bit RSA and AES-GCM.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Cryptography",
      "Sockets",
      "Threading"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Encrypted Chat",
    "rating": 4.7,
    "downloads": 3429,
    "stars": 829
  },
  {
    "id": "cybersecurity-19",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Educational Ransomware Simulator & Decryption Tool",
    "tagline": "Demonstrates how symmetric crypto encrypts folders and how master key restores files safely.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "AES-256",
      "Cryptography",
      "CLI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Ransomware Defense",
    "rating": 4.8,
    "downloads": 4290,
    "stars": 990
  },
  {
    "id": "cybersecurity-20",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "DNS Spoofing & Cache Poisoning Detection Utility",
    "tagline": "Compares DNS response resolutions across multiple authoritative root resolvers.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "dnspython",
      "Scapy",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "DNS Defense",
    "rating": 4.7,
    "downloads": 4661,
    "stars": 661
  },
  {
    "id": "cybersecurity-21",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "File System Integrity Monitor (AIDE / Tripwire Clone)",
    "tagline": "Calculates baseline SHA-256 hashes of system binaries and alerts on unauthorized file mods.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "SQLite3",
      "Hash Verification"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Integrity Monitor",
    "rating": 4.9,
    "downloads": 1775,
    "stars": 575
  },
  {
    "id": "cybersecurity-22",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Malware Signature Scanner with YARA Rule Integration",
    "tagline": "Scans binary files against custom YARA rule signatures to detect trojan payloads.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "yara-python",
      "File Scanner"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Malware Analysis",
    "rating": 4.6,
    "downloads": 4784,
    "stars": 784
  },
  {
    "id": "cybersecurity-23",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Network Packet Sniffer & Traffic Visualizer with Scapy",
    "tagline": "Visualizes real-time bandwidth consumption and flags suspicious ICMP flood anomalies.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Scapy",
      "Matplotlib",
      "Tkinter"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Traffic Analysis",
    "rating": 4.7,
    "downloads": 4877,
    "stars": 877
  },
  {
    "id": "cybersecurity-24",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Linux Security Audit & Hardening Benchmark Script",
    "tagline": "Audits Linux server configurations against CIS benchmarks and generates PDF report.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Bash",
      "Linux Security",
      "ReportLab"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "System Hardening",
    "rating": 4.7,
    "downloads": 2161,
    "stars": 961
  },
  {
    "id": "cybersecurity-25",
    "year": 2,
    "yearLabel": "2nd Year Project",
    "difficulty": "Medium",
    "title": "Digital Forensics RAM Memory Dump Inspector",
    "tagline": "Extracts cleartext passwords, open socket connections, and process trees from RAM dumps.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Volatility Framework API",
      "Forensics"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Memory Forensics",
    "rating": 4.6,
    "downloads": 2636,
    "stars": 736
  },
  {
    "id": "cybersecurity-26",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cloud Security Posture Management (CSPM) Scanner",
    "tagline": "Scans AWS / GCP cloud environments for exposed S3 buckets, open security groups, and IAM leaks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Boto3 / Google Cloud API",
      "FastAPI",
      "React"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Cloud Security Pre-Final",
    "rating": 4.9,
    "downloads": 2447,
    "stars": 547
  },
  {
    "id": "cybersecurity-27",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Network Intrusion Detection System (NIDS) with Deep Learning",
    "tagline": "Analyzes live packet flows with 1D-CNN to detect DDoS, port scans, and botnets in real time.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "PyTorch",
      "Scapy",
      "FastAPI",
      "React"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "AI Security",
    "rating": 4.7,
    "downloads": 3033,
    "stars": 433
  },
  {
    "id": "cybersecurity-28",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Threat Intelligence Aggregator with STIX/TAXII Feeds",
    "tagline": "Ingests malicious IP, domain, and file hash IOC feeds to automate firewall blacklists.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "STIX/TAXII",
      "Elasticsearch",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Threat Intel",
    "rating": 4.7,
    "downloads": 3653,
    "stars": 353
  },
  {
    "id": "cybersecurity-29",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Zero Trust Network Access (ZTNA) Microsegmentation Prototype",
    "tagline": "Context-aware authentication proxy enforcing device health and least privilege before access.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "FastAPI",
      "mTLS",
      "JWT",
      "Docker"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Zero Trust",
    "rating": 4.8,
    "downloads": 1766,
    "stars": 566
  },
  {
    "id": "cybersecurity-30",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Malware Dynamic Analysis Sandbox",
    "tagline": "Executes suspicious executables inside isolated VM, recording API hooks and registry changes.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "QEMU / VirtualBox API",
      "Volatililty",
      "Flask"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Malware Sandbox",
    "rating": 4.8,
    "downloads": 4594,
    "stars": 594
  },
  {
    "id": "cybersecurity-31",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Security Information & Event Management (SIEM) with Elastic",
    "tagline": "Ingests syslog, web, and auth logs into Elasticsearch with alerting rules for SOC analysts.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Elasticsearch",
      "Logstash",
      "Kibana",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "SIEM Platform",
    "rating": 4.9,
    "downloads": 2315,
    "stars": 415
  },
  {
    "id": "cybersecurity-32",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Phishing Email Detection with NLP & Header SPF/DKIM Analysis",
    "tagline": "Inspects email header routing, SPF/DMARC records, and NLP body cues to block phishing.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "HuggingFace Transformers",
      "DNS",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Email Defense",
    "rating": 4.6,
    "downloads": 4504,
    "stars": 504
  },
  {
    "id": "cybersecurity-33",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Endpoint Detection & Response (EDR) Agent for Linux/Windows",
    "tagline": "Lightweight host agent monitoring process creation, file modifications, and network connections.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "psutil",
      "Win32API",
      "WebSockets",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "EDR Agent",
    "rating": 4.9,
    "downloads": 2151,
    "stars": 951
  },
  {
    "id": "cybersecurity-34",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Automated Penetration Testing Framework for REST APIs",
    "tagline": "Fuzzes API endpoints for Broken Object Level Authorization (BOLA), JWT flaws, and rate limits.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Requests",
      "Asyncio",
      "ReportLab"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "API PenTesting",
    "rating": 4.9,
    "downloads": 3999,
    "stars": 699
  },
  {
    "id": "cybersecurity-35",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cloud Storage Data Leak & SAIF Compliance Scanner",
    "tagline": "Scans Cloud Storage buckets for unencrypted PII, credit cards, and public read ACLs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "GCP Cloud Storage API",
      "FastAPI",
      "React"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Cloud Compliance",
    "rating": 4.8,
    "downloads": 3578,
    "stars": 978
  },
  {
    "id": "cybersecurity-36",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Cryptographic Ransomware Early Warning Honeypot System",
    "tagline": "Deploys canary files across network shares to trigger immediate isolation when encrypted.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Watchdog",
      "File System",
      "Twilio Alert"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Ransomware Defense",
    "rating": 4.9,
    "downloads": 4967,
    "stars": 967
  },
  {
    "id": "cybersecurity-37",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Bluetooth Low Energy (BLE) Threat & Rogue Beacon Monitor",
    "tagline": "Scans radio environment for rogue BLE beacons, AirTag trackers, and spoofed peripherals.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Bleak Library",
      "Bluetooth",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Wireless Security",
    "rating": 4.9,
    "downloads": 1999,
    "stars": 799
  },
  {
    "id": "cybersecurity-38",
    "year": 3,
    "yearLabel": "3rd Year Project",
    "difficulty": "Hard",
    "title": "Privilege Escalation & IAM Role Risk Analyzer",
    "tagline": "Graph-based analyzer uncovering hidden privilege escalation paths in cloud IAM policies.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "NetworkX",
      "Boto3",
      "React Dashboard"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "IAM Security",
    "rating": 4.8,
    "downloads": 4842,
    "stars": 842
  },
  {
    "id": "cybersecurity-39",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Autonomous AI Cyber Sentinel & Network Threat Hunter",
    "tagline": "Deep reinforcement learning agent defending simulated enterprise networks against APT attacks.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "PyTorch",
      "Gymnasium",
      "Suricata",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Major Capstone",
    "rating": 4.6,
    "downloads": 2156,
    "stars": 956
  },
  {
    "id": "cybersecurity-40",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Quantum-Resistant Cryptographic Protocol (NIST Kyber / Dilithium)",
    "tagline": "Post-quantum key encapsulation and digital signature verification engine resistant to Shor's algorithm.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "C++",
      "Python",
      "liboqs",
      "Kyber-1024",
      "Dilithium"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Post-Quantum",
    "rating": 4.6,
    "downloads": 3748,
    "stars": 448
  },
  {
    "id": "cybersecurity-41",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Deception Technology & Active Defense Decoy Grid",
    "tagline": "High-interaction enterprise network deception grid misleading adversaries into honeynets.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Docker",
      "eBPF",
      "FastAPI",
      "React"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Deception Grid",
    "rating": 4.7,
    "downloads": 3665,
    "stars": 365
  },
  {
    "id": "cybersecurity-42",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Cloud-Native Runtime Security Sensor with eBPF & Cilium",
    "tagline": "Kernel-level eBPF sensor detecting zero-day container escapes and unauthorized syscalls.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "C",
      "eBPF",
      "Go / Python",
      "Kubernetes"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "eBPF Security",
    "rating": 4.9,
    "downloads": 3763,
    "stars": 463
  },
  {
    "id": "cybersecurity-43",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "MITRE ATT&CK Automated Adversary Emulation Engine",
    "tagline": "Simulates realistic adversary techniques (TTPs) to benchmark SOC detection capabilities.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "MITRE ATT&CK",
      "YAML",
      "FastAPI",
      "React"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Adversary Emulation",
    "rating": 4.7,
    "downloads": 2629,
    "stars": 729
  },
  {
    "id": "cybersecurity-44",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "AI-Powered Binary Reverse Engineering & Decompiler Assistant",
    "tagline": "Decompiles raw x86 assembly into annotated C code with deep learning vulnerability hints.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Ghidra API",
      "LLaMA-3",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Binary Analysis",
    "rating": 4.6,
    "downloads": 2560,
    "stars": 660
  },
  {
    "id": "cybersecurity-45",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Cyber Threat Hunting with Graph Neural Networks (GNN)",
    "tagline": "Discovers multi-stage Advanced Persistent Threat (APT) attack graphs from audit logs.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "PyTorch Geometric",
      "NetworkX",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Graph Threat Hunt",
    "rating": 4.7,
    "downloads": 2277,
    "stars": 377
  },
  {
    "id": "cybersecurity-46",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Blockchain-Anchored Zero-Knowledge Security Audit Ledger",
    "tagline": "Creates immutable tamper-evident SOC audit logs with zero-knowledge proof verification.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Solidity",
      "Circom",
      "Python",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Audit Ledger",
    "rating": 4.8,
    "downloads": 2470,
    "stars": 570
  },
  {
    "id": "cybersecurity-47",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Software Supply Chain Security & SBOM Vulnerability Tracker",
    "tagline": "Generates Software Bill of Materials (SBOM) and maps dependency graphs to CVE advisories.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "CycloneDX",
      "NVD API",
      "Docker",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Supply Chain Sec",
    "rating": 4.7,
    "downloads": 4681,
    "stars": 681
  },
  {
    "id": "cybersecurity-48",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Kubernetes Cluster Attack Surface Visualizer & Hardening Engine",
    "tagline": "Visualizes RBAC misconfigurations, pod security policies, and network exposure maps.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "Kubernetes API",
      "React",
      "D3.js"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "K8s Security",
    "rating": 4.8,
    "downloads": 1842,
    "stars": 642
  },
  {
    "id": "cybersecurity-49",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Secure Multi-Party Computation (SMPC) Privacy Engine",
    "tagline": "Enables joint data analysis across encrypted datasets without revealing private records.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "SMPC",
      "Secret Sharing",
      "Cryptography"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Privacy Compute",
    "rating": 4.6,
    "downloads": 3900,
    "stars": 600
  },
  {
    "id": "cybersecurity-50",
    "year": 4,
    "yearLabel": "4th Year Project",
    "difficulty": "Very Hard",
    "title": "Drone Cyber Hijacking & RF Jamming Defense System",
    "tagline": "Detects GPS spoofing and radio frequency interference attacks against unmanned drones.",
    "degrees": [
      "B.Tech",
      "BCA",
      "B.Sc"
    ],
    "category": "cybersecurity",
    "categoryLabel": "Cybersecurity & Cloud",
    "techStack": [
      "Python",
      "GNSS SDR",
      "Scapy",
      "FastAPI"
    ],
    "icon": "shield",
    "color": "#ef4444",
    "badge": "Drone Cyber Sec",
    "rating": 4.7,
    "downloads": 3989,
    "stars": 689
  }
];

const DOMAINS_LIST = [
  { id: "all", name: "All Domains (450)", icon: "layout-grid" },
  { id: "ai-ml", name: "AI & Machine Learning (50)", icon: "brain-circuit" },
  { id: "iot-embedded", name: "IoT & Hardware (50)", icon: "cpu" },
  { id: "java", name: "Java & Enterprise (50)", icon: "coffee" },
  { id: "mobile", name: "Mobile Flutter (50)", icon: "smartphone" },
  { id: "blockchain", name: "Blockchain & Web3 (50)", icon: "blocks" },
  { id: "web-dev", name: "Web & Full Stack (50)", icon: "globe" },
  { id: "python-data", name: "Python & Data Science (50)", icon: "terminal" },
  { id: "cybersecurity", name: "Cybersecurity & Cloud (50)", icon: "shield" },
  { id: "c-cpp", name: "C / C++ Systems (50)", icon: "code" }
];

const ACADEMIC_YEARS = [
  { id: "all", name: "All Years (450)", icon: "graduation-cap", count: 450 },
  { id: "1", name: "1st Year (Beginner)", icon: "sparkles", count: 111, desc: "Fundamental C/C++, Python Basics, Simple Web & CLI Utilities" },
  { id: "2", name: "2nd Year (Intermediate)", icon: "book-open", count: 117, desc: "Java OOPs, MySQL, Flask, Flutter Mini, IoT Nodes, Security Tools" },
  { id: "3", name: "3rd Year (Hard / Pre-Final)", icon: "rocket", count: 116, desc: "MERN, Django, PyTorch ML, LoRa IoT, Web3 DApps, Cloud CSPM" },
  { id: "4", name: "4th Year (Major / Capstone)", icon: "trophy", count: 106, desc: "Deep RL, Kubernetes Microservices, Post-Quantum, Distributed DBs" }
];

const DEGREE_STREAMS = [
  { id: "all", name: "All Degrees", icon: "layers", count: 450, label: "All Streams" },
  { id: "B.Tech", name: "B.Tech Projects", icon: "cpu", count: 450, label: "B.Tech (CSE / IT / AI / ECE)" },
  { id: "BCA", name: "BCA Projects", icon: "monitor", count: 344, label: "BCA (Software & Web Apps)" },
  { id: "B.Sc", name: "B.Sc Projects", icon: "atom", count: 344, label: "B.Sc (Computer Science / IT)" },
  { id: "Diploma", name: "Diploma Projects", icon: "wrench", count: 344, label: "Diploma (Polytechnic Engineering)" },
  { id: "MCA", name: "MCA Projects", icon: "terminal", count: 40, label: "MCA (Master of Computer Applications)" },
  { id: "M.Tech", name: "M.Tech Projects", icon: "rocket", count: 40, label: "M.Tech (Advanced Systems & Research)" }
];

const DIFFICULTY_LEVELS = [
  { id: "all", name: "All Levels" },
  { id: "Easy", name: "Easy (1st Year)" },
  { id: "Medium", name: "Medium (2nd Year)" },
  { id: "Hard", name: "Hard (3rd Year)" },
  { id: "Very Hard", name: "Very Hard (4th Year Major)" }
];


