from flask import Flask, render_template, request, json, session
import pymongo                 
from bson.objectid import ObjectId  # para poder usar _id de mongo

app = Flask(__name__)
app.secret_key = 'mi clave secreta'

#conexcion a base de datos     
myClient = pymongo.MongoClient("mongodb+srv://davis123:davis123@cluster0.hujqu.mongodb.net/test3")
myDb = myClient["webNoCode"]#basde de datos
myCollection=myDb["num1"]#coleccion1

@app.route('/')
def hello():
    session['usuario'] = 'juan'
    return render_template('index.html')

@app.route('/XD', methods=['POST'])
def xd():
    cadenaDiccionario = request.form['infoDiccionario']
    cadenaDiccStyleBody = request.form['infostyleBody']

    doc = {"usuario": session['usuario'], 'cadenaDiccionario': cadenaDiccionario, 'cadenaDiccStyleBody': cadenaDiccStyleBody}
    print(doc)
    #myDb.myCollection.insert_one(doc)

    query = {"_id": ObjectId('640102e8b36c14b0651d2f3f')}
    updateTask = {"$set": doc}
    myDb.myCollection.update_one(query, updateTask)
    
    d = myDb.myCollection.find({'usuario': session['usuario']})
    print(d)
    for documento in d:
        print(documento['cadenaDiccionario'])
        print(documento['cadenaDiccStyleBody'])
    
    return render_template('index.html', diccionario = documento['cadenaDiccionario'], styleBody = documento['cadenaDiccStyleBody'])

    #return str(cadena)

@app.route('/test')
def test():
    return 'Test'

@app.route('/result')
def result():
    dict = {'phy':50,'che':60,'maths':70}
    return render_template('result.html', result = dict)

if __name__ == '__main__':
    app.run(debug=True, port=5300)    
