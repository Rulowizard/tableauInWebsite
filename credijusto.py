from flask import (Flask, render_template, redirect, Markup, request , 
    Response, jsonify,url_for)

import json

from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()

import pandas as pd

engine = create_engine ("mysql://root:Aa1$0110m@localhost/credijusto")

app = Flask(__name__)

global globalperfil
globalperfil = ""

@app.route("/")
def index():
    globalperfil=""
    return render_template("login.html" , test =["Test"] )


@app.route("/login_info" , methods =["GET"] )
def log_info():
    global globalperfil
    globalperfil=""
    usuario = request.args.get("usuario")
    password = request.args.get("pass")
    print(usuario)
    print(password)

    conn = engine.connect()
    df = pd.read_sql("Select permission FROM permissions as p join users as u on p.profile_id = u.profile_id and u.email='"+usuario+"' and u.enc_pass ='"+password+"'" , conn   )
    print(f"longitud df: {len(df)}")
    if len(df)>0:
        globalperfil=df.iloc[0,0]
        print(f"metodo login: {globalperfil}")
        return jsonify( globalperfil )
    else:
        return jsonify(False)

@app.route("/sign_up" , methods=["GET"] )
def sign_up():
    global globalperfil
    globalperfil=""
    usuario = request.args.get("usuario")
    password = request.args.get("pass")
    perfil = request.args.get("perfil")
    print(usuario)
    print(password)
    print(perfil)

    conn = engine.connect()
    df = pd.read_sql("Select id FROM users where email='"+usuario+"'" , conn   )

    if len(df)>0:
        #Ya existe usuario
        return jsonify(False)
    else:
        globalperfil=perfil
        permissions = pd.read_sql("Select * from permissions order by profile_id", conn)
        permission_id = permissions[  permissions["permission"]==perfil  ].iloc[0,0]
        query = "insert into users values (id,'"+usuario +"','"+password+ "'," + str(permission_id)+ "); "
        engine.execute(query)
    return jsonify(True)

@app.route("/load_tableau")
def load_tableau():
    return render_template("home.html")

@app.route("/get_perfil", methods=["GET"])
def get_perfil():
    global globalperfil
    print(f"metodo get perfil: {globalperfil}")

    return jsonify(globalperfil)


if __name__ == "__main__":
    app.run(debug=True)