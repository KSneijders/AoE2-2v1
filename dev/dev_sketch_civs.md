```json5
{
    'civ-modifiers': [
        {
            'civ-has-challenges': false,  // Defaults to true when left out?
            'civs': ['aztecs', 'incas', 'mayans'],
            'challenges': [
                'horse_challenge1',
                'horse_challenge2',
                'horse_challenge3'
            ]
        },
        {
            // Also add solo civ exclusions
            'civ-has-challenges': true,  // Defaults to true when left out?
            'civs': [/*All the heresy civs*/],
            'challenges': ['get_heresy']
        }
    ]
}
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