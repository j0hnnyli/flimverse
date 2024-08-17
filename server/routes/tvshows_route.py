from flask import Blueprint, jsonify
import requests
import os

TMDB_API_KEY = os.getenv('TMDB_API_READ_ACCESS')
tvshows_bp = Blueprint('tvshows', __name__)


@tvshows_bp.route('/api/tvshows')
def get_tvshows():
    try:
        url = "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {TMDB_API_KEY}"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message': 'List of TV shows',
            'data': data['results']
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500