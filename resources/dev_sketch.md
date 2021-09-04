# Gamemodes

- Full Random
- Free Pick
- Controlled Pick 

## Ruleset

A set of rules that define how the app functions.

```js
// random.js
{
    'pick_challenges': 'random',
    'civ': {
        'solo': {
            'base_on_player_points': false
            'amount': 5,
            // etc. etc. etc.
        },
        'duo': false
            // etc. etc. etc.
    }
}
```

## Point system

- Can select points
- Calculate points based on (a V b)
- Add players (keep score) with +&- buttons

# History

- Commands / Challenges + Civ & Map & Win/Loss (?)
- Maybe even match link (?)

# Map picker

- Amount of maps for solo / duo players

# Civ picker

- Amount of civs for solo / duo players
- Generate civs AFTER commands

# Challenges (duo)

- Own branch (challenges)
  - Multiple challenge sets (?)
- Pull raw json from git.challenges
- Generate challenges AFTER civs
- `[Editor Mode]` Can be added in GUI
- `[Editor Mode]` Can be changed in GUI
- `[Editor Mode]` Can be deleted (?) in GUI

```js
{
    'id': 'no_lumber_camps',
    'name': 'No Lumbercamps',
    'points': 4 || {'key': 0},
    'desc': 'some comment about it',
    'classes': [''],
    'civs': [''],
    'maps': ['']
}
```

# Commands (solo)

```js
{
    'id': 'even_out',
    'name': 'Even out x',
    'points': {
        'vills':    [5, 7]
        'military': [4, 6]
    },
    'max_repeat': 2,
    'classes': [''],
    'civs': [''],
    'maps': ['']
}
```

# Point distribution

- Random gamemode = no min/max
- Categories:
  - Eco
  - Military
  - Building
  - Tech
  - Misc
- Wildpoints
