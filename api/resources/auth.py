
from flask import Blueprint, Response, request, session, jsonify,make_response
from database.db import User, db
from flask_restful import Resource
import datetime

class CurrentUserApi(Resource):
    def get(self):
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"error": "Unauthorized"}), 401
        
        user = User.query.filter_by(id=user_id).first()
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email
        }) 

class SignupApi(Resource):
    def post(self):
        name = request.json["name"]
        email = request.json["email"]
        password = request.json["password"]

        user_exists = User.query.filter_by(email=email).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        new_user = User(email=email, name=name, password=password)
        new_user.hash_password()
        db.session.add(new_user)
        db.session.commit()
        
        session["user_id"] = new_user.id

        return jsonify({
            "id": new_user.id,
            "email": new_user.email
        }) 

class LoginApi(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        if not user.check_password(password):
            return jsonify({"error": "Unauthorized"}), 401
        
        session["user_id"] = user.id

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

class LogoutApi(Resource):
    def post(self):
        session.pop("user_id")
        return "200"