#Ruleset

#Objects
##Challenges, Commands
```json5
{
    // Enables the challenges for this game mode
    enabled: true,

    // Decides how the challenges are picked
    // The following options are available
    // [
    //  'random'       # Picks random challenges/commands for the Defendants and Challengers
    //  'free'         # Defendants and Challengers can choose their own challenges/commands
    //  'defendants'   # The Defendants may choose the challenges/commands
    //  'challengers'  # The Challengers may chooses the challenges/commands
    // ]
    pick: "random",
  
    // Look at the points_distribution header
    points_distribution: {}
}
```

### points_distribution
```json5
{
    // The properties within this object will change the way the points are distributed
    // amongst the categories. See the categories header for the specific options
    "economy": {},
    "military": {},
    "buildings": {},
    "technologies": {},
    "miscellaneous": {},
  
    // The properties within this object will give more variety to the points_distribution.
    "wild_points": {}
}
```

#### economy, military, buildings, technologies, miscellaneous
```json5
{
    // Enables the category
    "enabled": true,
  
    // Minimum amount of points this category must receive
    "min_quantity": null,
  
    // Maximum amount of points this category can receive
    "max_quantity": null,
  
    // Bases the chosen values on either 'percentage' or 'exact' value.
    "type": "percentage",
  
    // If wild points can be added in this category
    "wild_points": true
    
}
```

#### wild_points
```json5
{
    // Enables the wild points for the categories
    "enabled": true,
  
    // The amount of points being distributed for the categories.
    "quantity": 50,
  
    // Bases the chosen values on either 'percentage' or 'exact' value.
    "type": "percentage"
}
```


## civ
```json5
{
    // The properties within these object will decide how the civ are chosen for
    // either the Challengers or the Defendants.
    "defendants": { },
    "challengers": { }
}
```

### defendants, challengers
```json5
{
    // The amount of civs to (choose) from.
    "quantity": 3,

    // Bases the chosen quantity on either 'percentage' or 'exact' value.
    // Percentage being based on the defendants player value.
    "type": "exact",


    // Decides how the civ are picked
    // The following options are available
    // [
    //  'random'       # Picks random civ for you
    //  'random_pick'  # Picks random civs for you based on quantity. Then you choose from those
    //  'free'         # You can choose your own civ
    //  'defendants'   # Defendants will choose the civ for you
    //  'challengers'  # Challenger will choose the civ for you
    // ]
    "pick": "random"
}
```

## map
```json5
{
    // The amount of maps to (choose) from.
    "quantity": 1,

    // Decides how the maps are picked
    // The following options are available
    // [
    //  'random'                    # Picks a random map for you
    //  'random_pick_defendant'     # Picks random maps for you based on quantity. Then you choose from those
    //  'random_pick_challengers'   # Picks random maps for you based on quantity. Then you choose from those
    //  'defendants'                # Defendants will choose the map 
    //  'challengers'               # Challenger will choose the map
    // ]
    "pick": "random"
}
```
