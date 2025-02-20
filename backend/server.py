import os
import logging
from flask import Flask, json, jsonify, request, send_from_directory
from flask_cors import CORS
from json import JSONDecodeError
from actions.dispense import dispense_drink
from actions.reset import reset
from actions.clean import clean_all_positions
from config.setup import clean_gpio, setup_gpio
from hardware.scale import tare, calibrate

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__, static_folder="../frontend/dist", static_url_path="/")
CORS(app, origins="*")
JSON_FOLDER = "database"


@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, "index.html")


@app.route('/tare', methods=['POST'])
def tare_scale():
    try:
        tare()
        return jsonify({"message": "Scale tared"}), 200
    except Exception as e:
        return jsonify({"error": f"Error while taring scale: {str(e)}"}), 500


@app.route('/reset', methods=['POST'])
def reset_hardware():
    try:
        reset()
        return jsonify({"message": "Hardware successfully reset"}), 200
    except Exception as e:
        return jsonify({"error": f"Error while resetting hardware: {str(e)}"}), 500


@app.route('/clean', methods=['POST'])
def clean():
    try:
        clean_all_positions()
        return jsonify({"message": "Successfully cleaned"}), 200
    except Exception as e:
        return jsonify({"error": f"Error while cleaning: {str(e)}"}), 500


@app.route('/calibrate', methods=['POST'])
def calibrate():
    try:
        calibrate(100)
        return jsonify({"message": "Successfully calibrated"}), 200
    except Exception as e:
        return jsonify({"error": f"Error while calibrating: {str(e)}"}), 500


@app.route('/shutdown', methods=['POST'])
def shutdown():
    try:
        #shutdown functionality
        clean_gpio()
        return jsonify({"message": "Raspberry Pi will be shut down"}), 200
    except Exception as e:
        return jsonify({"error": f"Error while shutting down: {str(e)}"}), 500


@app.route('/liquids', methods=['GET'])
def get_liquids():
    liquids_filepath = os.path.join(JSON_FOLDER, 'liquids.json')

    if not os.path.isfile(liquids_filepath):
        return {"error": "File not found"}, 404

    try:
        with open(liquids_filepath, 'r') as liquids_file:
            liquids_data = json.load(liquids_file)
        return jsonify(liquids_data)
    except JSONDecodeError:
        return {"error": "Invalid JSON format"}, 400


@app.route('/drinks/<filename>', methods=['GET'])
def get_data(filename):
    filepath = os.path.join(JSON_FOLDER, filename + ".json")
    liquids_filepath = os.path.join(JSON_FOLDER, 'liquids.json')

    if not os.path.isfile(filepath) or not os.path.isfile(liquids_filepath):
        return {"error": "File not found"}, 404

    try:
        with open(filepath, 'r') as file:
            drinks_data = json.load(file)

        with open(liquids_filepath, 'r') as liquids_file:
            liquids_data = json.load(liquids_file)

        available_drinks = {}
        overall_drink_ml = 0
        for drink_id, drink in drinks_data.items():
            drink_ml = drink['gesamtmenge_ml']
            overall_drink_ml = drink_ml
            available = True
            for ingredient_id, percentage in drink['zutaten'].items():
                amount = percentage / 100 * drink_ml
                if str(ingredient_id) not in liquids_data or liquids_data[str(ingredient_id)][
                        'fuellstand_ml'] < amount or liquids_data[str(ingredient_id)]['anschlussplatz'] == 0:
                    available = False
                    break
            if available:
                available_drinks[drink_id] = drink

        return jsonify(available_drinks, overall_drink_ml)
    except JSONDecodeError:
        return {"error": "Invalid JSON format"}, 400


@app.route('/preparation', methods=['POST'])
def preparation():
    data = request.get_json()

    if 'drink' not in data or 'strength' not in data:
        return jsonify({"error": "Missing required parameters"}), 400

    drink_name = data['drink']
    strength = data['strength']
    filename = "longdrinks.json" if data['category'] == "Longdrinks" else "mixdrinks.json"

    drinks_filepath = os.path.join(JSON_FOLDER, filename)
    liquids_filepath = os.path.join(JSON_FOLDER, 'liquids.json')

    if not os.path.isfile(drinks_filepath) or not os.path.isfile(liquids_filepath):
        return {"error": "File not found"}, 404

    try:
        with open(drinks_filepath, 'r') as drinks_file:
            drinks_data = json.load(drinks_file)

        with open(liquids_filepath, 'r') as liquids_file:
            liquids_data = json.load(liquids_file)

        drink_data = None
        for drink_id, drink in drinks_data.items():
            if drink['name'] == drink_name:
                drink_data = drink
                break

        if drink_data is None:
            return {"error": "Drink not found"}, 404

        drink_ml = drink_data['gesamtmenge_ml']
        ingredients = {}

        for ingredient_id, percentage in drink_data['zutaten'].items():
            if filename == "mixdrinks.json":
                if liquids_data[str(ingredient_id)]['alkohol'] == False:
                    amount = (percentage - 5) / 100 * drink_ml if strength == "stark" else (
                        percentage + 5) / 100 * drink_ml if strength == "schwach" else percentage / 100 * drink_ml
                else:
                    amount = (percentage - 5) / 100 * drink_ml if strength == "schwach" else (
                        percentage + 5) / 100 * drink_ml if strength == "stark" else percentage / 100 * drink_ml
            else:
                amount = percentage / 100 * drink_ml
            if str(ingredient_id) in liquids_data:
                liquids_data[str(ingredient_id)]['fuellstand_ml'] -= amount
                ingredients[ingredient_id] = amount

        with open(liquids_filepath, 'w') as liquids_file:
            json.dump(liquids_data, liquids_file, indent=4, sort_keys=False)

        dispense_drink(ingredients)

        return '', 204
    except JSONDecodeError:
        return {"error": "Invalid JSON format"}, 400


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

            return jsonify({"message": "gesamtmenge_ml updated successfully in 'longdrinks.json' and 'mixdrinks.json'"
                           }), 200

        else:
            return jsonify({"error": f"Invalid file_name '{file_name}'"}), 400

    except JSONDecodeError:
        return jsonify({"error": "Invalid JSON format in file"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    setup_gpio()
    reset()
    app.run(host="0.0.0.0", port=5000, debug=True)
