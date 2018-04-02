import glob
import json


def make_playlist_id(city, state):
    _city = city.lower().replace(' ', '-')
    _state = state.lower().replace(' ', '-')
    country = 'usa'
    return '{0}-{1}-{2}'.format(_city, _state, country)


playlists = []
for playlistFile in glob.glob("./data/playlists/*.json"):
    with open(playlistFile) as json_data:
        d = json.load(json_data)
        playlists.append({
            'id': make_playlist_id(d['city'], d['state']),
            'city': d['city'],
            'state': d['state'],
            'playlistUri': 'spotify:user:bandsfromhere:playlist:' + d['playlistId'],
            'country': 'United States'
        })

with open('playlists.json', 'w') as outfile:
    json.dump(playlists, outfile)
