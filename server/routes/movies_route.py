from flask import Blueprint, jsonify
import requests
import os

TMDB_API_KEY = os.getenv('TMDB_API_READ_ACCESS')
movies_bp = Blueprint('movies', __name__)
BASE_URL = 'https://api.themoviedb.org/3/'
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {TMDB_API_KEY}"
}

@movies_bp.route('/movies/populars/<int:page>')
def get_movies(page):
    try:
        url = f"{BASE_URL}movie/popular?language=en-US&page={page}"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message': 'List of movies',
            'data': data['results']
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

@movies_bp.route('/movies/<int:id>')
def get_movie(id):
    try:
        url = f'{BASE_URL}movie/{id}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Movie {id}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})

@movies_bp.route('/movies/<string:value>/<int:page>')
def get_movies_search(value, page):
    try:
        url = f'{BASE_URL}/search/movie?query={value}&language=en-US&page={page}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'movies- {value}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})

