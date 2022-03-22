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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaDialog = exports.Media = exports.blockRenderer = exports.isEnable = void 0;
var react_1 = __importStar(require("react"));
var draft_js_1 = require("draft-js");
var material_1 = require("@mui/material");
var styles = {
    image: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};
var isEnable = function (props) {
    var state = props.state;
    var editorState = state.editorState;
    var selection = editorState.getSelection();
    var isCollapsed = selection.isCollapsed();
    return isCollapsed;
};
exports.isEnable = isEnable;
var Imgtag = function (props) {
    return react_1.default.createElement("img", { src: props.src, alt: "" });
};
var Videotag = function (props) {
    var src = "//www.youtube.com/embed/" + props.src;
    return (react_1.default.createElement("iframe", { src: src, width: props.width, height: props.height }));
};
var blockRenderer = function (block) {
    if (block.getType() === 'atomic') {
        return {
            component: exports.Media,
            editable: false,
        };
    }
    return null;
};
exports.blockRenderer = blockRenderer;
var Media = function (props) {
    var entity = props.contentState.getEntity(props.block.getEntityAt(0));
    var _a = entity.getData(), src = _a.src, height = _a.height, width = _a.width;
    var type = entity.getType();
    var media;
    if (type === "IMAGE") {
        media = react_1.default.createElement(Imgtag, { src: src, height: height, width: width });
    }
    else if (type === "VIDEO") {
        media = react_1.default.createElement(Videotag, { src: src, height: height, width: width });
    }
    return media;
};
exports.Media = Media;
var MediaDialog = function (props) {
    var state = props.state, onToggle = props.onToggle;
    var editorState = state.editorState;
    var _a = (0, react_1.useState)({ showUrlInput: false, src: "", width: 400, height: 200, mediaKey: null }), mediaState = _a[0], setMediaState = _a[1];
    var selection = editorState.getSelection();
    var isCollapsed = selection.isCollapsed();
    if ((props.open === true) && (mediaState.showUrlInput === false) && (isCollapsed === true)) {
        if (props.label === "Video") {
            mediaState.src = "";
        }
        else {
            mediaState.src = "";
        }
        mediaState.showUrlInput = true;
        setMediaState(__assign({}, mediaState));
    }
    var mediaCancel = function (e) {
        e.preventDefault();
        onToggle(editorState);
        setMediaState({
            showUrlInput: false,
            src: "",
            width: 400,
            height: 200,
            mediaKey: null,
        });
    };
    var mediaConfirm = function (e) {
        e.preventDefault();
        var editorState = state.editorState;
        var contentState = editorState.getCurrentContent();
        var contentStateWithEntity = contentState.createEntity(props.style, 'IMMUTABLE', { src: mediaState.src, width: mediaState.width, height: mediaState.height });
        var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        var newEditorState = draft_js_1.EditorState.set(editorState, { currentContent: contentStateWithEntity });
        onToggle(draft_js_1.AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
        setMediaState({
            showUrlInput: false,
            src: "",
            width: 400,
            height: 200,
            mediaKey: null,
        });
    };
    if (props.label === "Video") {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Dialog, { open: mediaState.showUrlInput, onClose: mediaCancel },
                react_1.default.createElement(material_1.DialogContent, null,
                    react_1.default.createElement(material_1.TextField, { autoFocus: true, defaultValue: mediaState.src, margin: "dense", id: "url", label: "URL", type: "url", fullWidth: true, onChange: function (e) {
                            mediaState.src = e.currentTarget.value;
                            setMediaState(__assign({}, mediaState));
                        }, variant: "standard" }),
                    react_1.default.createElement(material_1.TextField, { defaultValue: mediaState.height, margin: "dense", id: "height", label: "HEIGHT", type: "number", onChange: function (e) {
                            mediaState.height = e.currentTarget.value;
                            setMediaState(__assign({}, mediaState));
                        }, variant: "outlined", size: "small" }),
                    react_1.default.createElement(material_1.TextField, { defaultValue: mediaState.width, margin: "dense", id: "width", label: "WIDTH", type: "number", onChange: function (e) {
                            mediaState.width = e.currentTarget.value;
                            setMediaState(__assign({}, mediaState));
                        }, variant: "outlined", size: "small" })),
                react_1.default.createElement(material_1.DialogActions, null,
                    react_1.default.createElement(material_1.Button, { onClick: mediaCancel }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { onClick: mediaConfirm }, "OK")))));
    }
    else {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Dialog, { open: mediaState.showUrlInput, onClose: mediaCancel },
                react_1.default.createElement(material_1.DialogContent, null,
                    react_1.default.createElement(material_1.TextField, { autoFocus: true, defaultValue: mediaState.src, margin: "dense", id: "url", label: "URL", type: "url", fullWidth: true, onChange: function (e) {
                            mediaState.src = e.currentTarget.value;
                            setMediaState(__assign({}, mediaState));
                        }, variant: "standard" })),
                react_1.default.createElement(material_1.DialogActions, null,
                    react_1.default.createElement(material_1.Button, { onClick: mediaCancel }, "Cancel"),
                    react_1.default.createElement(material_1.Button, { onClick: mediaConfirm }, "OK")))));
    }
};
exports.MediaDialog = MediaDialog;
//# sourceMappingURL=Media.js.map