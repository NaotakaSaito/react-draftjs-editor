/// <reference types="react" />
import { ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './richeditor.css';
export declare const convertToHTML: (contentState: ContentState) => string;
export declare const EditorApp: (props: any) => JSX.Element;
