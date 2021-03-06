import React from "react";
import { EditorState, RichUtils } from 'draft-js';
import { EditorStateProps } from '../common';

interface DividerProps extends EditorStateProps {
    onToggle: (editorState: EditorState) => void;
}

export const StyleControls = (props: any) => {
    const className = 'RichEditor-styleButton';
    return (
        <React.Fragment>
            <span className={className} onMouseDown={(e) => {
                e.preventDefault();
                onClick(props);
            }}>Div
            </span>
        </React.Fragment>
    )
}

export const Divider = (props: any) => {
    return (
        <hr></hr>
    );
}

export const blockRenderer = (block: Draft.ContentBlock) => {
    if (block.getType() === 'HR') {
        return {
            component: Divider,
            editable: false,
        };
    }
    return null;
}


export const onClick = (props: DividerProps) => {
    const { state, onToggle } = props;
    const { editorState } = state;

    onToggle(
        RichUtils.toggleBlockType(
            //RichUtils.toggleBlockType(
            editorState,
            "HR"
        )
    )
}
