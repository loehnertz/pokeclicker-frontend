"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var reducers_1 = require("./reducers");
exports.store = redux_1.createStore(reducers_1["default"]);
exports["default"] = exports.store;
