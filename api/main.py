from flask import Flask, jsonify
from flask_cors import CORS
import http.client
import json
import keys
from prettytable import PrettyTable

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/fixtures', methods=['GET'])
def get_fixtures():
    conn = http.client.HTTPSConnection("v3.football.api-sports.io")

    headers = {
        'x-rapidapi-host': "v3.football.api-sports.io",
        'x-rapidapi-key': keys.API_KEY
    }

    conn.request("GET", "/fixtures?live=all", headers=headers)
    res = conn.getresponse()
    data = res.read()
    response_dict = json.loads(data)

    total = response_dict.get('results', 0)
    world_matches = []
    for i in range(len(response_dict['response'])):
        match_data = {
            'league': response_dict['response'][i]['league'],
            'teams': response_dict['response'][i]['teams'],
            'goals': response_dict['response'][i]['goals'],
            'score': response_dict['response'][i]['score'],
            'events': response_dict['response'][i]['events']
        }
        world_matches.append(match_data)
    return jsonify(world_matches)

if __name__ == '__main__':
    app.run(debug=True)
