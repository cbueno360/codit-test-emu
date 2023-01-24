
from flask import Blueprint, Response, request, session, jsonify, current_app
from database.db import User, db
from flask_restful import Resource
import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import csv
import os
import datetime
from werkzeug.utils import secure_filename
import os.path
from os import path

class ExamApi(Resource):
    def get(self):
        data = {
            "Success" : True,
            "Data" : None,
        }
        return jsonify(data)

    