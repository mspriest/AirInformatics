# import necessary libraries
import os, sqlite3, json
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from sqlalchemy import text
###################################################
# Flask Setup
#################################################
app = Flask(__name__)

DB = "superclean_facilities.db"
#################################################
# Database Connect
#################################################

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///superclean_facilities.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# This variable will be used for all SQLAlchemy commands

db = SQLAlchemy(app)

def get_all_data( json_str = False ):
    ghg_query = db.session.execute(text("""
    SELECT * from facility_leveldf_2010 
    UNION ALL
    SELECT * from facility_leveldf_2011 
    UNION ALL
    SELECT * from facility_leveldf_2012 
    UNION ALL
    SELECT * from facility_leveldf_2013 
    UNION ALL
    SELECT * from facility_leveldf_2014 
    UNION ALL
    SELECT * from facility_leveldf_2015 
    UNION ALL
    SELECT * from facility_leveldf_2016 
    UNION ALL
    SELECT * from facility_leveldf_2017 
    UNION ALL
    SELECT * from facility_leveldf_2018
    UNION ALL
    SELECT * from facility_leveldf_2019"""))
    all_data_json = json.dumps([dict(ix) for ix in ghg_query])
    return all_data_json

def get_all_air( json_str = False ):
    air_query = db.session.execute(text("""SELECT * from airquality"""))
    all_air_json = json.dumps([dict(ix) for ix in air_query])
    return all_air_json

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/GHGdata")
def ghgdata():
    return get_all_data()

@app.route("/api/AIRdata")
def airdata():
    return get_all_air()

if __name__ == "__main__":
    app.run(debug=True)
    