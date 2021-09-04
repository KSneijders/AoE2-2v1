import json
from typing import Dict, List, Any

with open('./challenges.json', 'r') as file:
    categories: Dict[str, List[Dict[str, Any]]] = json.load(file)

    for name, challenges in categories.items():
        for challenge in challenges:
            if 'c-range' in challenge:
                challenge['points'] = {}
                for (point, key) in challenge['c-range']:
                    challenge['points'][key] = point
                del challenge['c-range']
            if 'comment' in challenge:
                challenge['desc'] = challenge['comment']
                del challenge['comment']
            if 'dev-comment' in challenge:
                challenge['dev-desc'] = challenge['dev-comment']
                del challenge['dev-comment']
            if 'id' not in challenge:
                challenge['id'] = challenge['name']\
                    .replace(' ', '_')\
                    .replace('/', '')\
                    .replace('%', '_percent_')\
                    .replace('__', '_')\
                    .lower()

    # Remember to categorize commands
    # del categories['commands']

    with open('./challenges_out.json', 'w') as ofile:
        ofile.write(json.dumps(categories, indent=4))
