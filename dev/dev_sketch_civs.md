File to add civ limitations to challenges. Added automatically after reading challenges.
100% equivalent to adding them to the main challenges file directly, 
except for the fact that this can combine civs and challenges in nice lists.

```json5
[
    {
        "civs-have-challenges": false,
        'civs': [
            'aztecs','incas','mayans'
        ],
        'challenges': [
            'horse_challenge1',
            'horse_challenge2',
            'horse_challenge3'
        ]
    },
    {
        "civs-have-challenges": true,
        'civs': [
            /* All the heresy civs */
        ],
        'challenges': [
            'get_heresy'
        ]
    }
]
```

Would be equal to:

```json5
{
    'horse_challenge1': {
        // ...
        'civs': [/* All civs but aztecs, incas, mayans */],
        // ...
    },
    'horse_challenge2': {
        // ...
        'civs': [/* All civs but aztecs, incas, mayans */],
        // ...
    },
    'horse_challenge3': {
        // ...
        'civs': [/* All civs but aztecs, incas, mayans */],
        // ...
    },
    'get_heresy': {
        // ...
        'civs': [/* All civs included in above list */],
        // ...
    }
}
```