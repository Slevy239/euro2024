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

    if 'errors' in response_dict:
        return jsonify({'message': 'Out of Requests'})
    current_euro_matches = 0
    fixtures_data = []
    for i in range(total):
        if response_dict['response'][i]['league']['id'] == 4:
            current_euro_matches += 1

    if current_euro_matches == 0:
        return jsonify({'message': 'No Results'})
    else:
        for i in range(total):
            listed, all_info = response_dict['response'][i]['events'], response_dict['response'][i]
            if all_info['league']['id'] == 4:
                home, away = all_info['teams']['home']['name'], all_info['teams']['away']['name']
                home_score, away_score = all_info['goals']['home'], all_info['goals']['away']

                match_data = {
                    'home_team': home,
                    'away_team': away,
                    'home_score': home_score,
                    'away_score': away_score,
                    'events': []
                }

                if home_score + away_score >= 0:
                    for event in listed:
                        event_data = {
                            'time_elapsed': event['time']['elapsed'],
                            'player_name': event['player']['name'],
                            'team_name': event['team']['name'],
                            'event_type': event['type']
                        }
                        match_data['events'].append(event_data)

                fixtures_data.append(match_data)

    return jsonify(fixtures_data)


if __name__ == '__main__':
    app.run(debug=True)
