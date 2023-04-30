from flask import Flask, render_template, request
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
import pandas as pd
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)

df = pd.read_csv("data/comcast_consumeraffairs_complaints.csv")
df.dropna(inplace=True)
df = df[df['rating']!=0]
df = df[df['rating'] != 1]
only_1 = df[df['rating'] == 1].loc[0:100]
df = pd.concat([df,only_1])

vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df['text'])

SA = SentimentIntensityAnalyzer()

model = KMeans(n_clusters=5)
model.fit(X)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cluster', methods=['POST'])
def cluster():
    new_text = [request.form['message']]
    new_X = vectorizer.transform(new_text)
    combined_X = pd.concat([pd.DataFrame(X.toarray()), pd.DataFrame(new_X.toarray())])
    new_model = KMeans(n_clusters=5)
    new_model.fit(combined_X)
    new_text_label = new_model.predict(new_X)[0]
    similarity_scores = model.transform(new_X)
    top_3_indices = similarity_scores.argsort()[0][:3]
    top_3_comments = df.iloc[top_3_indices]['text'].tolist()
    similar_message = df[model.labels_ == new_text_label]['text'].iloc[0]
    
    sentiment_scores = []
    for sentiment_ana in top_3_comments:
        score = SA.polarity_scores(sentiment_ana)
        if score['neg'] > score['pos']:
            sentiment_scores.append('neg')
        else:
            sentiment_scores.append('pos')
    
    return render_template('results.html',similar_message=similar_message,top_3_comments=zip(top_3_comments,sentiment_scores))

if __name__ == '__main__':
    app.run(debug=True)
