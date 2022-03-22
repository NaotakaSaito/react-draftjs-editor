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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorMenu = exports.UserMenu = void 0;
var react_1 = __importStar(require("react"));
var AppBar_1 = __importDefault(require("@mui/material/AppBar"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
var Typography_1 = __importDefault(require("@mui/material/Typography"));
var material_1 = require("@mui/material");
var Container_1 = __importDefault(require("@mui/material/Container"));
var Button_1 = __importDefault(require("@mui/material/Button"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var draft_js_1 = require("draft-js");
var UserMenu = function (_a) {
    var anchorEl = _a.anchorEl, onClose = _a.onClose, anchorOrigin = _a.anchorOrigin, transformOrigin = _a.transformOrigin, Items = _a.Items;
    return (react_1.default.createElement(material_1.Menu, { sx: { mt: '45px' }, id: "menu-appbar", anchorEl: anchorEl, anchorOrigin: anchorOrigin, keepMounted: true, transformOrigin: transformOrigin, open: Boolean(anchorEl), onClose: onClose }, Items.map(function (Item) { return (react_1.default.createElement(MenuItem_1.default, { key: Item.Label, onClick: Item.onClick },
        react_1.default.createElement(Typography_1.default, { textAlign: "center" }, Item.Label))); })));
};
exports.UserMenu = UserMenu;
var EditorMenu = function (_a) {
    var state = _a.state, onChange = _a.onChange, children = _a.children;
    var editorState = state.editorState;
    var titleInputRef = (0, react_1.useRef)(null);
    var _b = react_1.default.useState(null), anchorElNav = _b[0], setAnchorElNav = _b[1];
    var inputFile = (0, react_1.useRef)(null);
    var _c = react_1.default.useState({
        editTitle: false,
        title: "unknown.json",
        anchorEl: null,
        Items: [],
        transformOrigin: null,
        anchorOrigin: null,
    }), menuObj = _c[0], setMenuObj = _c[1];
    var pages = [
        {
            Label: 'File',
            Items: [
                {
                    Label: "new",
                    onClick: function (e) {
                        menuObj.anchorEl = null;
                        menuObj.title = "unknown.json";
                        setMenuObj(__assign({}, menuObj));
                        onChange({
                            blocks: [],
                            entityMap: {}
                        });
                    }
                },
                {
                    Label: "open",
                    onClick: function (e) {
                        var _a;
                        menuObj.anchorEl = null;
                        setMenuObj(__assign({}, menuObj));
                        (_a = inputFile.current) === null || _a === void 0 ? void 0 : _a.click();
                    }
                },
                {
                    Label: "save",
                    onClick: function (e) {
                        var obj = (0, draft_js_1.convertToRaw)(editorState.getCurrentContent());
                        var blob = new Blob([JSON.stringify(obj)], { type: 'text/plain' });
                        var url = URL.createObjectURL(blob);
                        var a = document.createElement("a");
                        document.body.appendChild(a);
                        a.download = menuObj.title;
                        a.href = url;
                        a.click();
                        a.remove();
                        URL.revokeObjectURL(url);
                        menuObj.anchorEl = null;
                        setMenuObj(__assign({}, menuObj));
                    }
                }
            ]
        }
    ];
    var handleCloseUserMenu = function () {
        menuObj.anchorEl = null;
        setMenuObj(__assign({}, menuObj));
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(AppBar_1.default, { position: "static" },
            react_1.default.createElement(Container_1.default, { maxWidth: "xl" },
                react_1.default.createElement(Toolbar_1.default, { disableGutters: true },
                    react_1.default.createElement(Typography_1.default, { variant: "h6", noWrap: true, component: "div", sx: { mr: 2 }, onDoubleClick: function (e) {
                            menuObj.editTitle = true;
                            setMenuObj(__assign({}, menuObj));
                        } }, menuObj.editTitle === false ?
                        menuObj.title :
                        (react_1.default.createElement("input", { defaultValue: menuObj.title, ref: titleInputRef, onKeyDown: function (e) {
                                var _a;
                                switch (e.key) {
                                    case "Enter":
                                        menuObj.title = (_a = titleInputRef.current) === null || _a === void 0 ? void 0 : _a.value;
                                        menuObj.editTitle = false;
                                        setMenuObj(__assign({}, menuObj));
                                        break;
                                    case "Escape":
                                        menuObj.editTitle = false;
                                        setMenuObj(__assign({}, menuObj));
                                        break;
                                }
                            } }))),
                    react_1.default.createElement(Box_1.default, { sx: { flexGrow: 1 } }, pages.map(function (page) { return (react_1.default.createElement(Button_1.default, { key: page.Label, onClick: function (e) {
                            menuObj.anchorEl = e.currentTarget;
                            menuObj.Items = page.Items;
                            menuObj.anchorOrigin = {
                                vertical: 'top',
                                horizontal: 'left',
                            };
                            menuObj.transformOrigin = {
                                vertical: 'top',
                                horizontal: 'left',
                            };
                            setMenuObj(__assign({}, menuObj));
                        }, sx: { my: 2, color: 'white', display: 'block' } }, page.Label)); })),
                    react_1.default.createElement(exports.UserMenu, { anchorEl: menuObj.anchorEl, onClose: handleCloseUserMenu, anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, transformOrigin: {
                            vertical: 'top',
                            horizontal: 'right',
                        }, Items: menuObj.Items }),
                    react_1.default.createElement("input", { id: "file", type: "file", style: { display: "none" }, ref: inputFile, onChange: function (e) {
                            new Promise(function (resolve, reject) {
                                var _a;
                                var reader = new FileReader();
                                reader.onerror = function () { return reject(reader.error); };
                                reader.onload = function () { return resolve(reader.result || ''); };
                                var files = (_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.files;
                                if (files && files.length > 0) {
                                    menuObj.title = files[0].name;
                                    setMenuObj(__assign({}, menuObj));
                                    reader.readAsText(files[0]);
                                }
                                else {
                                    reject({ message: 'file not found' });
                                }
                            }).then(function (values) {
                                var obj = JSON.parse(values);
                                if (obj) {
                                    onChange(obj);
                                }
                                e.target.value = "";
                            }).catch(function (err) {
                                console.log(err);
                            });
                        } })))),
        children));
};
exports.EditorMenu = EditorMenu;
//# sourceMappingURL=EditorMenu.js.map