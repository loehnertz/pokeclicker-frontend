"use strict";
//
// State
//
exports.__esModule = true;
//
// Actions
//
var UserActionType;
(function (UserActionType) {
    UserActionType["SET"] = "USER_SET";
})(UserActionType = exports.UserActionType || (exports.UserActionType = {}));
var PokemonActionType;
(function (PokemonActionType) {
    PokemonActionType["ADD_OR_REPLACE"] = "POKEMON_ADD_OR_REPLACE";
    PokemonActionType["CLEAR"] = "POKEMON_CLEAR";
})(PokemonActionType = exports.PokemonActionType || (exports.PokemonActionType = {}));
var ItemActionType;
(function (ItemActionType) {
    ItemActionType["ADD_OR_REPLACE"] = "ITEM_ADD_OR_REPLACE";
    ItemActionType["CLEAR"] = "ITEM_CLEAR";
})(ItemActionType = exports.ItemActionType || (exports.ItemActionType = {}));
