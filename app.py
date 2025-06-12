from flask import Flask, render_template, request, jsonify
from converter import UNITS, convert_value

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/units/<category>')
def get_units(category):
    units = UNITS.get(category, {}).keys()
    return jsonify(sorted(units))

@app.route('/convert', methods=['POST'])
def convert():
    data = request.json
    category = data.get('category')
    from_unit = data.get('from_unit')
    to_unit = data.get('to_unit')
    value = data.get('value')
    try:
        value = float(value)
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid numeric value'}), 400
    try:
        result = convert_value(category, from_unit, to_unit, value)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
