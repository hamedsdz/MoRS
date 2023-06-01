import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient(
    'mongodb+srv://hamedsdz:sadeghzadeh79@mors.ajybh77.mongodb.net/?retryWrites=true&w=majority')
db = client['test']
movies_collection = db['movies']
movies = list(movies_collection.find())

ratings_collection = db['ratings']
ratings_data = list(ratings_collection.find())

ratings_df = pd.DataFrame(ratings_data)
user_movie_matrix = ratings_df.pivot_table(
    index='user', columns='movie', values='rate')


def calculate_cosine_similarity(matrix):
    return cosine_similarity(matrix.fillna(0))


user_similarity = calculate_cosine_similarity(user_movie_matrix)


def get_movie_recommendations(user, user_similarity, user_movie_matrix, movies, top_n=10):
    if user not in user_movie_matrix.index:
        print(f"User ID {user} not found in the user_movie_matrix.")
        return []

    user_index = np.where(user_movie_matrix.index == user)[0][0]
    similar_users = list(enumerate(user_similarity[user_index]))
    similar_users = sorted(similar_users, key=lambda x: x[1], reverse=True)[1:]

    user_movie_ratings = user_movie_matrix.loc[user]
    unrated_movies = user_movie_ratings[user_movie_ratings.isnull()].index

    movie_scores = {}
    for movie in unrated_movies:
        total_weighted_score = 0
        total_similarity = 0
        for similar_user, similarity in similar_users:
            similar_user = user_movie_matrix.index[similar_user]
            similar_user_rating = user_movie_matrix.loc[similar_user, movie]
            if not np.isnan(similar_user_rating):
                total_weighted_score += similarity * similar_user_rating
                total_similarity += similarity
        if total_similarity > 0:
            movie_scores[movie] = total_weighted_score / total_similarity
    recommended_movies = sorted(
        movie_scores, key=movie_scores.get, reverse=True)[:top_n]
    recommended_movies = [
        movie for movie in movies if movie['_id'] in recommended_movies]
    return recommended_movies


user = ObjectId("6475df2826a4cdfc8f47f010")
top_n = 11

recommended_movies = get_movie_recommendations(
    user, user_similarity, user_movie_matrix, movies, top_n)
print(recommended_movies)
