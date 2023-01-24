from flask import Flask
from database.db import db
from resources.routes import initialize_routes
from config import ApplicationConfig
from flask_restful import Api
from resources.routes import initialize_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(ApplicationConfig)
api = Api(app)

db.init_app(app)

with app.app_context():
    db.create_all()

initialize_routes(api)
