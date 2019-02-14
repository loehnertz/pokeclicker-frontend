"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var pokemon_1 = require("./pokemon");
var item_1 = require("./item");
var user_1 = require("./user");
var entitiesReducer = redux_1.combineReducers({
    user: user_1.userReducer,
    pokemons: pokemon_1.pokemonReducer,
    items: item_1.itemReducer
});
var reducer = redux_1.combineReducers({
    entities: entitiesReducer
});
exports["default"] = reducer;
