import glob
import json

playlists = []
for playlistFile in glob.glob("./data/playlists/*.json"):
    with open(playlistFile) as json_data:
        d = json.load(json_data)
        playlists.append({
            'city': d['city'],
            'state': d['state'],
            'playlistUri': 'spotify:user:bandsfromhere:playlist:' + d['playlistId'],
            'country': 'United States'
        })

with open('playlists.json', 'w') as outfile:
    json.dump(playlists, outfile)
