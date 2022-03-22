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
exports.EditorApp = exports.convertToHTML = void 0;
var react_1 = __importStar(require("react"));
var draft_js_1 = require("draft-js");
var draft_js_export_html_1 = require("draft-js-export-html");
var material_1 = require("@mui/material");
var Link = __importStar(require("./Components/Link"));
var Divider = __importStar(require("./Components/Divider"));
var Media = __importStar(require("./Components/Media"));
var Color_1 = require("./Components/Color");
var EditorMenu_1 = require("./EditorMenu");
require("draft-js/dist/Draft.css");
require("./richeditor.css");
var compositeDecorator = new draft_js_1.CompositeDecorator([Link.decorator]);
var blockRenderers = [Media.blockRenderer, Divider.blockRenderer];
var colors = ['#000000', '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'];
var styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};
colors.forEach(function (elm) {
    styleMap[elm] = { color: elm };
});
function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
var StyleButton = function (props) {
    var onToggle = function (e) {
        e.preventDefault();
        props.onToggle(props.style);
    };
    var className = 'RichEditor-styleButton';
    if (props.active) {
        className += ' RichEditor-activeButton';
    }
    return (react_1.default.createElement("span", { className: className, onMouseDown: onToggle }, props.label));
};
var BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];
var BlockStyleControls = function (props) {
    var editorState = props.editorState;
    var selection = editorState.getSelection();
    var blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return (react_1.default.createElement(material_1.Box, { component: "div", className: "RichEditor-controls", sx: {
            display: 'inline',
            p: 1,
            m: 1,
            bgcolor: function (theme) { return (theme.palette.mode === 'dark' ? '#101010' : '#fff'); },
            color: function (theme) {
                return theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800';
            },
            border: '1px solid',
            borderColor: function (theme) {
                return theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300';
            },
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
        } }, BLOCK_TYPES.map(function (type) {
        return react_1.default.createElement(StyleButton, { key: type.label, active: type.style === blockType, label: type.label, onToggle: props.onToggle, style: type.style });
    })));
};
var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];
var InlineStyleControls = function (props) {
    var editorState = props.editorState;
    var currentStyle = editorState.getCurrentInlineStyle();
    return (react_1.default.createElement(material_1.Box, { component: "div", className: "RichEditor-controls", sx: {
            display: 'inline',
            p: 1,
            m: 1,
            bgcolor: function (theme) { return (theme.palette.mode === 'dark' ? '#101010' : '#fff'); },
            color: function (theme) {
                return theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800';
            },
            border: '1px solid',
            borderColor: function (theme) {
                return theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300';
            },
            borderRadius: 2,
            fontSize: '0.875rem',
            fontWeight: '700',
        } }, INLINE_STYLES.map(function (type) {
        return react_1.default.createElement(StyleButton, { key: type.label, active: currentStyle.has(type.style), label: type.label, onToggle: props.onToggle, style: type.style });
    })));
};
var LinkStyleControls = function (props) {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var className = 'RichEditor-styleButton';
    if (Link.isActive(props)) {
        className += ' RichEditor-activeButton';
    }
    var onToggle = function (editorState) {
        setOpen(false);
        props.onToggle(editorState);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: className, onMouseDown: function (e) {
                e.preventDefault();
                if (Link.isEnable(props))
                    setOpen(true);
            } }, "Link"),
        react_1.default.createElement(Link.LinkDialog, __assign({ key: "Link", open: open, label: "Link" }, props, { onToggle: onToggle, style: "LINK" }))));
};
var DividerControls = function (props) {
    var className = 'RichEditor-styleButton';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: className, onMouseDown: function (e) {
                e.preventDefault();
                Divider.onClick(props);
            } }, "Div")));
};
var MediaStyleControls = function (props) {
    var _a = (0, react_1.useState)(false), open = _a[0], setOpen = _a[1];
    var className = 'RichEditor-styleButton';
    var key, label, style;
    var onToggle = function (editorState) {
        setOpen(false);
        props.onToggle(editorState);
    };
    if (props.mediaType === "Video") {
        key = "Video";
        label = "Video";
        style = "VIDEO";
    }
    else {
        key = "Image";
        label = "Image";
        style = "IMAGE";
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("span", { className: className, onMouseDown: function (e) {
                e.preventDefault();
                if (Media.isEnable(props))
                    setOpen(true);
            } }, props.mediaType),
        react_1.default.createElement(Media.MediaDialog, __assign({ open: open, label: label, style: style }, props, { onToggle: onToggle }))));
};
var initData = {
    "blocks": [
        {
            "key": "ad6f8",
            "text": "asdfadsfad",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "8ccm",
            "text": "Hello",
            "type": "header-one",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "37l4l",
            "text": "こんにちは",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [
                {
                    "offset": 1,
                    "length": 3,
                    "key": 0
                }
            ],
            "data": {}
        },
        {
            "key": "cnhts",
            "text": "",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }
    ],
    "entityMap": {
        "0": {
            "type": "LINK",
            "mutability": "MUTABLE",
            "data": {
                "url": "https:/www.yahoo.co.jp",
                "target": "_blank"
            }
        }
    }
};
var convertToHTML = function (contentState) {
    return (0, draft_js_export_html_1.stateToHTML)(contentState, {
        blockRenderers: {
            "HR": function (block) {
                return '<hr />';
            }
        }
    });
};
exports.convertToHTML = convertToHTML;
var EditorApp = function (props) {
    var _a = react_1.default.useState({
        editorState: draft_js_1.EditorState.createEmpty(compositeDecorator)
    }), state = _a[0], setState = _a[1];
    var editorState = state.editorState;
    var onChange = function (editorState) {
        state.editorState = editorState;
        setState(__assign({}, state));
    };
    var handleKeyCommand = function (command, state) {
        var newEditorState = draft_js_1.RichUtils.handleKeyCommand(editorState, command);
        if (newEditorState) {
            onChange(newEditorState);
            return true;
        }
        return false;
    };
    var mapKeyToEditorCommand = function (e) {
        if (e.keyCode === 9) {
            var newEditorState = draft_js_1.RichUtils.onTab(e, editorState, 4);
            if (newEditorState !== state.editorState) {
                onChange({ editorState: newEditorState });
            }
            return;
        }
        return (0, draft_js_1.getDefaultKeyBinding)(e);
    };
    var contentState = editorState.getCurrentContent();
    var className = 'RichEditor-editor';
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    var toggleBlockType = function (blockType) {
        onChange(draft_js_1.RichUtils.toggleBlockType(editorState, blockType));
    };
    var toggleInlineStyle = function (inlineStyle) {
        onChange(draft_js_1.RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };
    return (react_1.default.createElement(EditorMenu_1.EditorMenu, { state: state, onChange: function (rawData) {
            if (rawData === null) {
                setState({ editorState: draft_js_1.EditorState.createEmpty(compositeDecorator) });
            }
            else {
                setState({ editorState: draft_js_1.EditorState.createWithContent((0, draft_js_1.convertFromRaw)(rawData), compositeDecorator) });
            }
        } },
        react_1.default.createElement("div", { className: "RichEditor-root" },
            react_1.default.createElement("div", { style: { width: '100%' } },
                react_1.default.createElement(BlockStyleControls, { editorState: editorState, onToggle: toggleBlockType }),
                react_1.default.createElement(InlineStyleControls, { editorState: editorState, onToggle: toggleInlineStyle }),
                react_1.default.createElement(material_1.Box, { component: "div", className: "RichEditor-controls", sx: {
                        display: 'inline',
                        p: 1,
                        m: 1,
                        bgcolor: function (theme) { return (theme.palette.mode === 'dark' ? '#101010' : '#fff'); },
                        color: function (theme) {
                            return theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800';
                        },
                        border: '1px solid',
                        borderColor: function (theme) {
                            return theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300';
                        },
                        borderRadius: 2,
                        fontSize: '0.875rem',
                        fontWeight: '700',
                    } },
                    react_1.default.createElement(LinkStyleControls, { state: state, onToggle: onChange }),
                    react_1.default.createElement(DividerControls, { state: state, setState: setState, onToggle: onChange }),
                    react_1.default.createElement(MediaStyleControls, { state: state, setState: setState, onToggle: onChange, mediaType: "Image" }),
                    react_1.default.createElement(MediaStyleControls, { state: state, setState: setState, onToggle: onChange, mediaType: "Video" }),
                    react_1.default.createElement(Color_1.ColorPicker, { state: state, colors: colors, onToggle: onChange }))),
            react_1.default.createElement("div", { className: className },
                react_1.default.createElement(draft_js_1.Editor, { blockStyleFn: getBlockStyle, customStyleMap: styleMap, editorState: editorState, handleKeyCommand: handleKeyCommand, keyBindingFn: mapKeyToEditorCommand, onChange: onChange, placeholder: "", spellCheck: true, blockRendererFn: function (block) {
                        for (var _i = 0, blockRenderers_1 = blockRenderers; _i < blockRenderers_1.length; _i++) {
                            var br = blockRenderers_1[_i];
                            var render = br(block);
                            if (render === null) {
                                continue;
                            }
                            else {
                                return render;
                            }
                        }
                    } })))));
};
exports.EditorApp = EditorApp;
//# sourceMappingURL=index.js.map