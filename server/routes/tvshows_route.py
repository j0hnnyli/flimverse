from flask import Blueprint, jsonify
import requests
import os

TMDB_API_KEY = os.getenv('TMDB_API_READ_ACCESS')
tvshows_bp = Blueprint('tvshows', __name__)
BASE_URL = 'https://api.themoviedb.org/3/'
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {TMDB_API_KEY}"
}

@tvshows_bp.route('/tvshows/populars/<int:page>')
def get_tvshows(page):
    try:
        url = f"{BASE_URL}tv/popular?language=en-US&page={page}"
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message': 'List of TV shows',
            'data': data['results']
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

@tvshows_bp.route('/tvshows/<int:id>')
def get_tvshow(id):
    try:
        url = f'{BASE_URL}tv/{id}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Tv_Show {id}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})

@tvshows_bp.route('/tvshows/<string:value>/<int:page>')
def get_tvshows_search(value, page):
    try:
        url = f'{BASE_URL}search/tv?query={value}&language=en-US&page={page}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'TvShows - {value}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})

@tvshows_bp.route('/tvshows/genre/<int:genre>/<int:page>')
def get_tvshows_by_genre(genre, page):
    try:
        url = f'{BASE_URL}discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page={page}&sort_by=popularity.desc&with_genres={genre}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Tv Genre {genre}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})

@tvshows_bp.route('/tvshows/categories')
def get_tvshows_categories():
    try:
        url = f'{BASE_URL}genre/tv/list?language=en'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Tvshows Categories',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)}), 500