import sys
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId
import json
from datetime import datetime


client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['AI']
movies_collection = db['movies']
ratings_collection = db['ratings']

ratings_data = list(ratings_collection.find())
movies_data = list(movies_collection.find())

ratings_df = pd.DataFrame(ratings_data)
user_movie_matrix = ratings_df.pivot_table(
    index='user', columns='movie', values='rate', fill_value=0)

user_similarity = cosine_similarity(user_movie_matrix)


def get_movie_recommendations(user_id, user_similarity, user_movie_matrix, movies, top_n=10):
    if user_id not in user_movie_matrix.index:
        return []

    user_index = user_movie_matrix.index.get_loc(user_id)
    similar_users = list(enumerate(user_similarity[user_index]))
    similar_users = sorted(
        similar_users, key=lambda x: x[1], reverse=True)[1:]

    user_movie_ratings = user_movie_matrix.loc[user_id]
    unrated_movies = user_movie_ratings[user_movie_ratings == 0].index

    movie_scores = {}
    for movie in unrated_movies:
        total_weighted_score = 0
        total_similarity = 0
        for similar_user, similarity in similar_users:
            similar_user_rating = user_movie_matrix.iloc[similar_user][movie]
            if similar_user_rating > 0:
                total_weighted_score += similarity * similar_user_rating
                total_similarity += similarity
        if total_similarity > 0:
            movie_scores[movie] = total_weighted_score / total_similarity

    recommended_movie_ids = sorted(
        movie_scores, key=movie_scores.get, reverse=True)[:top_n]
    recommended_movies = [
        movie for movie in movies if movie['_id'] in recommended_movie_ids]
    return recommended_movies


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime):
            return o.isoformat()
        return super().default(o)


user_id = ObjectId(sys.argv[2])

recommended_movies = get_movie_recommendations(
    user_id, user_similarity, user_movie_matrix, movies_data)
print(json.dumps(recommended_movies, cls=JSONEncoder), end='')
