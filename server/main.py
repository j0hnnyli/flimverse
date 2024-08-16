from flask import Flask, jsonify
from flask_cors import CORS # type: ignore
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

TMDB_API_KEY = os.getenv('TMDB_API_READ_ACCESS')
JIKAN_BASE_URL = 'https://api.jikan.moe/v4'

@app.route('/hello')
def hello():
  return 'Hello World!'

@app.route('/api/animes')
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
    
@app.route('/api/tvshows')
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

@app.route('/api/movies')
def get_movies():
    try:
        url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {TMDB_API_KEY}"
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify({
            'message': 'List of movies',
            'data': data['results']
        })
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
  app.run(debug = True)