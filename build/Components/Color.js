"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPicker = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var draft_js_1 = require("draft-js");
var swatch = {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer',
};
var cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
};
var ColorPicker = function (props) {
    var state = props.state, onToggle = props.onToggle, colors = props.colors;
    var editorState = state.editorState;
    var _a = react_1.default.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
    var currentStyle = editorState.getCurrentInlineStyle();
    var handleClick = function (e) {
        setAnchorEl(e.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var open = Boolean(anchorEl);
    var id = open ? 'editorjs-color-picker' : undefined;
    var color = colors.find(function (elm) { return currentStyle.has(elm); }) || colors[0];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { "aria-describedby": id, style: swatch, onClick: handleClick },
            react_1.default.createElement("div", { style: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: color
                } })),
        react_1.default.createElement(material_1.Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            } },
            react_1.default.createElement(ColorButton, { colors: colors, state: state, selectColor: color, onClick: function (e, color) {
                    var selection = editorState.getSelection();
                    var nextContentState = colors.reduce(function (contentState, color) {
                        return draft_js_1.Modifier.removeInlineStyle(contentState, selection, color);
                    }, editorState.getCurrentContent());
                    var nextEditorState = draft_js_1.EditorState.push(editorState, nextContentState, 'change-inline-style');
                    if (selection.isCollapsed()) {
                        nextEditorState = currentStyle.reduce(function (state, color) {
                            return draft_js_1.RichUtils.toggleInlineStyle(state, color);
                        }, nextEditorState);
                    }
                    if (!currentStyle.has(color) && (color !== colors[0])) {
                        nextEditorState = draft_js_1.RichUtils.toggleInlineStyle(nextEditorState, color);
                    }
                    else {
                        color = colors[0];
                    }
                    onToggle(nextEditorState);
                } }))));
};
exports.ColorPicker = ColorPicker;
var ColorButton = function (props) {
    var selectColor = props.selectColor, colors = props.colors, onClick = props.onClick;
    return (react_1.default.createElement(material_1.Box, { sx: { border: 1, p: 1, bgcolor: 'background.paper' }, style: { width: 180 } }, colors.map(function (elm, index) {
        return react_1.default.createElement("button", { key: "color-button-" + elm, style: {
                margin: 5,
                padding: 2,
                backgroundColor: elm,
                borderRadius: 10,
                border: 'solid',
                borderColor: selectColor === elm ? '#000000' : '#e7e7e7',
                width: 20,
                height: 20
            }, onClick: function (e) { return onClick(e, elm); } });
    })));
};
//# sourceMappingURL=Color.js.map