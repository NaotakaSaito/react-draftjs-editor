/// <reference types="react" />
import { EditorState } from 'draft-js';
import { EditorStateProps } from '../common';
interface MediaEditorProps extends EditorStateProps {
    onToggle: (editorState: EditorState) => void;
    open: boolean;
    label: string;
    style: string;
}
export declare const isEnable: (props: EditorStateProps) => boolean;
export declare const blockRenderer: (block: Draft.ContentBlock) => {
    component: (props: any) => JSX.Element;
    editable: boolean;
};
export declare const Media: (props: any) => JSX.Element;
export declare const MediaDialog: (props: MediaEditorProps) => JSX.Element;
export {};
