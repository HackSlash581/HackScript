#HackScript

HackScript is the custom scripting language to accompany L.A.M.D.A. Quest.  It is compiled to JavaScript and attached to game entities.

##Supported Syntax
 1. Conditionals
 
 `if <expression>: <propertychain | function call | expression | assignment>`

 2. Timeouts
 
 `every <time in milliseconds>: <function name>`

 3. Assignment

 `<property | property chain>: <property>`

##Examples

`if enemy.distance < 2: player.activateShield`

`every 2000: player.heal`

`player.tunic.color: blue`
