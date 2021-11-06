# Units

## delete_starting_vills

TP x vills and kill

---

## no_sheep

Give sheperds 0 work rate + conversion to normal vil + use display instructions

---

## send_sheep_to_solo

Send all sheep to solo in control of Player X every ~5 seconds

---

## no_hunt

Give hunters 0 work rate + conversion to normal vil + use display instructions

---

## no_forage_bush

Give foragers 0 work rate + conversion to normal vil + use display instructions

---

## no_mining_camps

Disable

---

## no_lumber_camps

Disable

---

## no_mills

Max 1 mill. Check if mill is on map and if mill is next to tc. 
If not, delete all mill.
Also disable mill upgrades

---

## no_extra_tcs

Max of 1, disable if there's 1

---

## kill_vills_per_age

**UNSURE - TO BE IMPROVED (?)**

200 triggers to register vil pop constantly to variable.  
When aging, calculate % to kill, and keep teleporting and killing until value is hit.

---

## max_vills_in_dark_age

**UNSURE - TO BE IMPROVED (?)**

Do resources get refunded?
Disable when x vills. Delete queue with TC owner swap

---

## no_mining_upgrades

Disable

---

## no_lumber_upgrades

Disable

---

## no_mill_upgrades

Disable

---

## no_eco_upgrades

Disable

---

## no_stone

Give stone miners 0 work rate + conversion to normal vil + use display instructions

---

## no_selling_buying

**UNSURE (?)**

---

## no_wheelbarrow_line

Disable

---

## all_farms_must_touch_mill

**IMPOSSIBLE, SORT OF**

Maybe max amount of farms = amount of mills * 4

---

## max_farms

**UNSURE - TO BE IMPROVED (?)**

Disable when x amount of farms.

Not sure how to get around being able to place farms while others are being constructed + being able to 'create' farms from the dead farm placements even when already at the max...

---

## no_gold_units

Disable all gold units (except siege)

---

## no_trash

Disable all trash units

---

## no_uu

Disable all unique units

---

## delete_starting_scout

Kill scout at start of game, for dramatic effect

---

## no_good_civ_units

Disable units based on civ identity.  
e.g.: 'infantry civ': Disable all infantry

---

## make_{{unit}}

- make_scouts
- make_spearman
- make_skirmisher
- make_maa
- make_eagle_scouts
- make_archers
- make_rams
- make_scorpions
- make_uu

Track amount created with triggers and variables and increase XS variable. With condition check when enough created and set this to true.

---

## disable_{{unit}}_line

- disable_militia_line
- disable_spearman_line
- disable_scout_line
- disable_eagle_line
- disable_knight_line
- disable_camel_line
- disable_skirmisher_line
- disable_archer_line
- disable_ram_line
- disable_mangonal_line

Disable

---

# Buildings

## no_{{building}}

- no_walls
- no_palisade_walls
- no_stone_walls
- no_towers
- no_donjons
- no_university
- no_monastery
- no_castle
- no_market

Disable

---

## leave_gaps_between_walls

**99.999999% sure this is impossible**

---

## instant_8_houses

Disable all buildings except houses until 8 are made.

Track amount created with triggers and variables and increase XS variable. With condition check when enough created and set this to true.

---

## instant_barracks

Disable all buildings except barracks is made.

---

## make_n_houses

Track amount created with triggers and variables and increase XS variable. With condition check when enough created and set this to true.

---

# Technologies

## no_blacksmith_techs

Disable all

---

## get_all_blacksmith_techs

Check if all **that civ can** are researched, return true if so.

---

## no_current_age_blacksmith_techs

Disable based on age. When aged enable last age

---

## no_{{blacksmith_line}}

- no_archer_attack
- no_archer_defence
- no_melee_attack
- no_infantry_defence
- no_cavalry_defence

Disable

---

## no_{{tech}}

- no_unique_techs
- no_bloodlines
- no_ballistics
- no_loom

Disable

---

## get_{{tech}}

- get_murder_holes
- get_heresy

Check if tech is researched, return true if so.

---

# Miscellaneous

## max_pop

Change max pop (account for goths?)

---

## no_scouting (except with vills)

**Probably impossible**. Basically means you can only use villagers to scout unscouted terrain. But don't think you can force that.

---

## only_auto_scout

**UNSURE - TO BE IMPROVED (?)**

If so, after that, .
After 20 ingame seconds, disable of scout

---

## ally_migration

Do not allow gathering of any resource other than wood. Stop all vills with food collection.
Allow when new TC is detected within x range of other player.

---

## no_relics

**UNSURE - TO BE IMPROVED (?)**

Do not allow monk with relic? Drop relic as soon as monk holds it + notification. Maybe also Eject relics from monastaries every 30 seconds or so? If possible?

---

## instant_loom

**UNSURE - TO BE IMPROVED (?)**

Allow queueing of vills after loom would be great. So allow creation of vills when loom is researching... If that's possible. Not sure if the condition is still bugged...

---

## sacrifice_10_monks

Track amount created with triggers and variables and increase XS variable. With condition check when enough created. Then check when amount is 0 again and return true

---

## kill_vills_when_housed

Check if popcap is hit (non max) and tp 5 vils and kill them

---

## send_resource_to_solo

**UNSURE - TO BE IMPROVED (?)**

Check resource, not sure if it's possible to force the resource being send...

---

## delay_age_until_solo_aged

Enable aging when solo has aged