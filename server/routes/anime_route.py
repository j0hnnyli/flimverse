from flask import Blueprint, jsonify
import requests

anime_bp = Blueprint('anime', __name__)

JIKAN_BASE_URL = 'https://api.jikan.moe/v4'

@anime_bp.route('/animes/populars')
def get_animes():
    try:
        response = requests.get(f'{JIKAN_BASE_URL}/top/anime')  # Adjust endpoint if needed
        response.raise_for_status()  # Raise an HTTPError for bad responses
        data = response.json()
        return jsonify({
            'message': 'List of animes',
            'data': data['data']  # Adjust based on actual API response structure
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
@anime_bp.route('/animes/<int:id>')
def get_anime(id):
    try:
        response = requests.get(f'{JIKAN_BASE_URL}/anime/{id}')
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message' : f'Anime {id}',
            'data' : data
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)})
    