"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onClick = exports.blockRenderer = exports.Divider = void 0;
var react_1 = __importDefault(require("react"));
var draft_js_1 = require("draft-js");
var Divider = function (props) {
    return (react_1.default.createElement("hr", null));
};
exports.Divider = Divider;
var blockRenderer = function (block) {
    if (block.getType() === 'HR') {
        return {
            component: exports.Divider,
            editable: false,
        };
    }
    return null;
};
exports.blockRenderer = blockRenderer;
var onClick = function (props) {
    var state = props.state, onToggle = props.onToggle;
    var editorState = state.editorState;
    onToggle(draft_js_1.RichUtils.toggleBlockType(editorState, "HR"));
};
exports.onClick = onClick;
//# sourceMappingURL=Divider.js.map