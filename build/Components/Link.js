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
exports.LinkDialog = exports.isEnable = exports.isActive = exports.decorator = void 0;
var react_1 = __importStar(require("react"));
var draft_js_1 = require("draft-js");
var material_1 = require("@mui/material");
var styles = {
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};
exports.decorator = {
    strategy: function (contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(function (character) {
            var entityKey = character.getEntity();
            return (entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK');
        }, callback);
    },
    component: function (props) {
        var _a = props.contentState.getEntity(props.entityKey).getData(), url = _a.url, target = _a.target;
        return (react_1.default.createElement("a", { href: url, target: target, style: styles.link }, props.children));
    }
};
var isActive = function (props) {
    var state = props.state;
    var editorState = state.editorState;
    var contentState = editorState.getCurrentContent();
    var startKey = editorState.getSelection().getStartKey();
    var startOffset = editorState.getSelection().getStartOffset();
    var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    return linkKey ? true : false;
};
exports.isActive = isActive;
var isEnable = function (props) {
    var state = props.state;
    var editorState = state.editorState;
    var selection = editorState.getSelection();
    var isCollapsed = selection.isCollapsed();
    var contentState = editorState.getCurrentContent();
    var startKey = editorState.getSelection().getStartKey();
    var startOffset = editorState.getSelection().getStartOffset();
    var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
    var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
    if (!isCollapsed || linkKey) {
        return true;
    }
    return false;
};
exports.isEnable = isEnable;
var LinkDialog = function (props) {
    var state = props.state, onToggle = props.onToggle;
    var editorState = state.editorState;
    var _a = (0, react_1.useState)({ showUrlInput: false, url: "", disableRemove: true, targetBlank: false, linkKey: null }), linkState = _a[0], setLinkState = _a[1];
    var urlRef = (0, react_1.useRef)();
    if (props.open === true && linkState.showUrlInput === false) {
        var selection = editorState.getSelection();
        var isCollapsed = selection.isCollapsed();
        var contentState = editorState.getCurrentContent();
        var startKey = editorState.getSelection().getStartKey();
        var startOffset = editorState.getSelection().getStartOffset();
        var blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        var linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
        if (linkKey) {
            var linkInstance = contentState.getEntity(linkKey);
            var data = linkInstance.getData();
            linkState.linkKey = linkKey;
            linkState.url = data.url;
            linkState.targetBlank = data.target ? true : false;
            linkState.disableRemove = false;
        }
        else {
            linkState.linkKey = null;
            linkState.url = "";
            linkState.targetBlank = false;
            linkState.disableRemove = true;
        }
        if (!isCollapsed || linkKey) {
            linkState.showUrlInput = true;
            setLinkState(__assign({}, linkState));
            setTimeout(function () { return urlRef.current.focus(); }, 0);
        }
    }
    ;
    var linkConfirm = function (e) {
        e.preventDefault();
        var contentState = editorState.getCurrentContent();
        if (linkState.linkKey) {
            var newData = __assign({ url: linkState.url }, linkState.targetBlank ? { target: "_blank" } : null);
            contentState.replaceEntityData(linkState.linkKey, newData);
            onToggle(editorState);
        }
        else {
            var contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', __assign({ url: linkState.url }, linkState.targetBlank ? { target: "_blank" } : null));
            var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            var newEditorState = draft_js_1.EditorState.set(editorState, { currentContent: contentStateWithEntity });
            var selection = newEditorState.getSelection();
            onToggle(draft_js_1.RichUtils.toggleLink(newEditorState, selection, entityKey));
            console.log("### EditorState after onToggle ###");
            console.log({ raw: (0, draft_js_1.convertToRaw)(editorState.getCurrentContent()) });
        }
        setLinkState({
            showUrlInput: false,
            url: "",
            targetBlank: linkState.targetBlank,
            linkKey: null,
            disableRemove: false,
        });
    };
    var linkRemove = function (e) {
        e.preventDefault();
        var selection = editorState.getSelection();
        var contentState = editorState.getCurrentContent();
        var beforeBlock = contentState.getBlockBefore(selection.getStartKey());
        var endBlock = contentState.getBlockForKey(selection.getEndKey());
        var blockSelection = new draft_js_1.SelectionState({
            anchorKey: (beforeBlock === null || beforeBlock === void 0 ? void 0 : beforeBlock.getKey()) || selection.getStartKey(),
            anchorOffset: (beforeBlock === null || beforeBlock === void 0 ? void 0 : beforeBlock.getLength()) || 0,
            focusKey: selection.getEndKey(),
            focusOffset: endBlock.getLength(),
        });
        onToggle(draft_js_1.RichUtils.toggleLink(editorState, blockSelection, null));
        setLinkState({
            showUrlInput: false,
            url: "",
            targetBlank: linkState.targetBlank,
            linkKey: null,
            disableRemove: false,
        });
    };
    var linkCancel = function (e) {
        e.preventDefault();
        onToggle(editorState);
        setLinkState({
            showUrlInput: false,
            url: "",
            targetBlank: linkState.targetBlank,
            linkKey: null,
            disableRemove: false,
        });
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Dialog, { open: linkState.showUrlInput, onClose: linkCancel },
            react_1.default.createElement(material_1.DialogContent, null,
                react_1.default.createElement(material_1.TextField, { autoFocus: true, defaultValue: linkState.url, margin: "dense", id: "url", label: "URL", type: "url", fullWidth: true, onChange: function (e) {
                        linkState.url = e.currentTarget.value;
                        setLinkState(__assign({}, linkState));
                    }, variant: "standard", inputRef: urlRef }),
                react_1.default.createElement(material_1.FormGroup, null,
                    react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Checkbox, { checked: linkState.targetBlank, onChange: function (e) {
                                linkState.targetBlank = e.currentTarget.checked;
                                setLinkState(__assign({}, linkState));
                            } }), label: "target_blank" }))),
            react_1.default.createElement(material_1.DialogActions, null,
                react_1.default.createElement(material_1.Button, { onClick: linkCancel }, "Cancel"),
                react_1.default.createElement(material_1.Button, { onClick: linkRemove, disabled: linkState.disableRemove }, "Remove"),
                react_1.default.createElement(material_1.Button, { onClick: linkConfirm }, "OK")))));
};
exports.LinkDialog = LinkDialog;
//# sourceMappingURL=Link.js.map