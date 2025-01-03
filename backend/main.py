import os
import subprocess
from flask import Flask, json, jsonify, request
from flask_cors import CORS
from json import JSONDecodeError

app = Flask(__name__)
CORS(app, origins="*")
JSON_FOLDER = "database"


@app.route('/drinks/<filename>', methods=['GET'])
def get_data(filename):
    filepath = os.path.join(JSON_FOLDER, filename)

    if not os.path.isfile(filepath):
        return {"error": "File not found"}, 404

    try:
        with open(filepath, 'r') as file:
            data = json.load(file)
            return jsonify(data)
    except json.JSONDecodeError:
        return {"error": "Invalid JSON format"}, 400


@app.route('/preparation', methods=['POST'])
def preparation():
    data = request.get_json()

    if 'drink' not in data or 'strength' not in data:
        return jsonify({"error": "Missing required parameters"}), 400

    drink = data['drink']
    strength = data['strength']

    return jsonify({"drink": drink, "strength": strength}), 200


@app.route('/update/<file_name>', methods=['POST'])
def update_value(file_name):
    try:
        data = request.get_json()
        if 'value' not in data or 'index' not in data or 'category' not in data:
            return jsonify({"error": "Missing required parameters: 'index', 'category', 'value'"}), 400

        value = data['value']
        index = data['index']
        category = data['category']

        if file_name == "liquid":
            filepath = os.path.join(JSON_FOLDER, 'liquids.json')

            with open(filepath, 'r') as file:
                json_data = json.load(file)

            json_data[str(index)][str(category)] = value

            with open(filepath, 'w') as file:
                json.dump(json_data, file, indent=4, sort_keys=False)

            return jsonify({"message": f"'{category}' updated successfully at index {index}"}), 200

        elif file_name == "longdrinks":
            longdrinks_path = os.path.join(JSON_FOLDER, 'longdrinks.json')
            mixdrinks_path = os.path.join(JSON_FOLDER, 'mixdrinks.json')

            def update_gesamtmenge(filepath, category, new_value):
                try:
                    with open(filepath, 'r') as file:
                        json_data = json.load(file)

                    for key, item in json_data.items():
                        item[category] = new_value

                    with open(filepath, 'w') as file:
                        json.dump(json_data, file, indent=4, sort_keys=False)

                    return {"message": f"'{category}' updated successfully to {new_value}"}, 200

                except JSONDecodeError:
                    return {"error": "Invalid JSON format"}, 400
                except Exception as e:
                    return {"error": str(e)}, 500

            update_gesamtmenge(longdrinks_path, category, value)
            update_gesamtmenge(mixdrinks_path, category, value)

            return jsonify({"message": "gesamtmenge_ml updated successfully in 'longdrinks.json' and 'mixdrinks.json'"}), 200

        else:
            return jsonify({"error": f"Invalid file_name '{file_name}'"}), 400

    except JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in file"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/shutdown', methods=['POST'])
def shutdown():
    try:
        # Führe den Shutdown-Befehl aus
        # sudo visudo
        # NOPASSWD: /sbin/shutdown hinter root command
        subprocess.run(['sudo', 'shutdown', '-h', 'now'], check=True)
        return jsonify({"message": "System shutting down..."}), 200
    except subprocess.CalledProcessError as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
