import React, { useState } from "react";
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, CompositeDecorator, convertToRaw, convertFromRaw, convertFromHTML, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import { Box } from '@mui/material'
import * as Link from "./Components/Link"
import * as Divider from "./Components/Divider"
import * as Media from "./Components/Media"
import * as Block from "./Components/BlockStyle"
import * as Inline from "./Components/InlineStyle"
import { ColorPicker } from './Components/Color';
import { EditorStateType } from './common'
import { EditorMenu } from './EditorMenu';

import 'draft-js/dist/Draft.css';
import './richeditor.css'


const compositeDecorator = new CompositeDecorator([Link.decorator]);
const blockRenderers = [Media.blockRenderer, Divider.blockRenderer]

const colors = ['#000000', '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505',
    '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986',
    '#4A4A4A', '#9B9B9B', '#FFFFFF'];

const { ColorStyleMap, ColorOptionForConvertHTML } = (() => {
    const ColorStyleMap: any = {}
    const ColorOptionForConvertHTML: any = {}
    colors.forEach((elm) => {
        ColorStyleMap[elm] = { color: elm }
        ColorOptionForConvertHTML[elm] = { style: { color: elm } };
    })
    return { ColorStyleMap, ColorOptionForConvertHTML };
})();
const styleMap: any = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    ...ColorStyleMap
};

export const StyleButton = (props: any) => {
    const onToggle = (e: any) => {
        e.preventDefault();
        props.onToggle(props.style);
    };
    let className = 'RichEditor-styleButton';
    if (props.active) {
        className += ' RichEditor-activeButton';
    }
    return (
        <span className={className} onMouseDown={onToggle}>
            {props.label}
        </span>
    );
}

export const convertToHTML = (contentState: ContentState) => {
    return stateToHTML(contentState, {
        blockRenderers: {
            "HR": (block) => {
                return '<hr />'
            }
        },
        inlineStyles: ColorOptionForConvertHTML
    })
}

export const EditorApp = (props: any) => {
    const [state, setState] = React.useState<EditorStateType>({
        editorState: EditorState.createEmpty(compositeDecorator)
    });
    const { editorState } = state;
    const onChange = (editorState: any) => {
        state.editorState = editorState;
        setState({ ...state });
    }
    const handleKeyCommand = (command: any, state: any): any => {
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);
        if (newEditorState) {
            onChange(newEditorState);
            return true;
        }
        return false;
    }
    const mapKeyToEditorCommand = (e: any): any => {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== state.editorState) {
                onChange({ editorState: newEditorState });
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    const contentState = editorState.getCurrentContent();
    let className = 'RichEditor-editor';

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }

    const getBlockStyle = (block: any): any => {
        switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            default: return null;
        }
    }
    return (
        <EditorMenu
            state={state}
            onChange={(rawData: any) => {
                if (rawData === null) {
                    setState({ editorState: EditorState.createEmpty(compositeDecorator) })
                } else {
                    setState({ editorState: EditorState.createWithContent(convertFromRaw(rawData), compositeDecorator) })
                }

            }}>
            <div className="RichEditor-root">
                <div style={{ width: '100%' }}>
                    <Block.StyleControls
                        editorState={editorState}
                        onToggle={onChange}
                    />
                    <Inline.StyleControls
                        editorState={editorState}
                        onToggle={onChange}
                    />
                    <Box
                        component="div"
                        className="RichEditor-controls"
                        sx={{
                            display: 'inline',
                            p: 1,
                            m: 1,
                            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                            border: '1px solid',
                            borderColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                            borderRadius: 2,
                            fontSize: '0.875rem',
                            fontWeight: '700',
                        }}
                    >
                        <Link.StyleControls
                            state={state}
                            onToggle={onChange}
                        />
                        <Divider.StyleControls
                            state={state}
                            setState={setState}
                            onToggle={onChange}
                        />
                        <Media.StyleControls
                            state={state}
                            setState={setState}
                            onToggle={onChange}
                            mediaType={"Image"}
                        />
                        <Media.StyleControls
                            state={state}
                            setState={setState}
                            onToggle={onChange}
                            mediaType={"Video"}
                        />
                        <ColorPicker
                            state={state}
                            colors={colors}
                            onToggle={onChange}
                        />
                    </Box>
                </div>

                <div className={className}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={handleKeyCommand}
                        keyBindingFn={mapKeyToEditorCommand}
                        onChange={onChange}
                        placeholder=""
                        spellCheck={true}
                        blockRendererFn={(block: Draft.ContentBlock) => {
                            for (const br of blockRenderers) {
                                const render = br(block);
                                if (render === null) {
                                    continue;
                                } else {
                                    return render;
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </EditorMenu>
    )
}


