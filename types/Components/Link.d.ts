/// <reference types="react" />
import { EditorState, DraftDecorator } from 'draft-js';
import { EditorStateProps } from '../common';
interface LinkEditorProps extends EditorStateProps {
    onToggle: (editorState: EditorState) => void;
    open: boolean;
}
export declare const decorator: DraftDecorator;
export declare const isActive: (props: EditorStateProps) => boolean;
export declare const isEnable: (props: EditorStateProps) => boolean;
export declare const LinkDialog: (props: LinkEditorProps) => JSX.Element;
export {};
