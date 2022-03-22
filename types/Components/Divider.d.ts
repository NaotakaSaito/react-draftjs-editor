/// <reference types="react" />
import { EditorState } from 'draft-js';
import { EditorStateProps } from '../common';
interface DividerProps extends EditorStateProps {
    onToggle: (editorState: EditorState) => void;
}
export declare const Divider: (props: any) => JSX.Element;
export declare const blockRenderer: (block: Draft.ContentBlock) => {
    component: (props: any) => JSX.Element;
    editable: boolean;
};
export declare const onClick: (props: DividerProps) => void;
export {};
