from flask import Blueprint, jsonify
import requests
import os

TMDB_API_KEY = os.getenv('TMDB_API_READ_ACCESS')
tvshows_bp = Blueprint('tvshows', __name__)
BASE_URL = 'https://api.themoviedb.org/3/tv'
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {TMDB_API_KEY}"
}

@tvshows_bp.route('/tvshows/populars')
def get_tvshows():
    try:
        url = f"{BASE_URL}/popular?language=en-US&page=1"
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
        url = f'{BASE_URL}/{id}'
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Tv_Show {id}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error' : str(e)})