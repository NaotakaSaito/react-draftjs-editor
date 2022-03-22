/// <reference types="react" />
import { EditorState } from 'draft-js';
import { EditorStateProps } from '../common';
interface ColorPickerProps extends EditorStateProps {
    onToggle: (editorState: EditorState) => void;
    colors: Array<string>;
}
export declare const ColorPicker: (props: ColorPickerProps) => JSX.Element;
export {};
