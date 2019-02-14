"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var types_1 = require("../types");
var redux_1 = require("redux");
var itemById = function (collection, action) {
    if (collection === void 0) { collection = {}; }
    var _a;
    switch (action.type) {
        case types_1.ItemActionType.ADD_OR_REPLACE:
            return __assign({}, collection, (_a = {}, _a[action.item.id] = action.item, _a));
        case types_1.ItemActionType.CLEAR:
            return {};
    }
    return __assign({}, collection);
};
var itemIds = function (ids, action) {
    if (ids === void 0) { ids = []; }
    switch (action.type) {
        case types_1.ItemActionType.ADD_OR_REPLACE:
            if (ids.indexOf(action.item.id) < 0) {
                return ids.concat([action.item.id]);
            }
            break;
        case types_1.ItemActionType.CLEAR:
            return [];
    }
    return ids;
};
exports.itemReducer = redux_1.combineReducers({ byId: itemById, allIds: itemIds });
