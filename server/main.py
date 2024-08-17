from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS # type: ignore
from routes.anime_route import anime_bp
from routes.tvshows_route import tvshows_bp
from routes.movies_route import movies_bp

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

app.register_blueprint(anime_bp)
app.register_blueprint(tvshows_bp)
app.register_blueprint(movies_bp)

if __name__ == '__main__':
  app.run(debug = True)