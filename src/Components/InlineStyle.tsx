import React from "react";
import { Box } from '@mui/material'
import { RichUtils } from 'draft-js';
import { StyleButton } from '../index'

const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

export const StyleControls = (props: any) => {
    const { editorState } = props;
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
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

            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={(inlineStyle: any) => {
                        props.onToggle(RichUtils.toggleInlineStyle(editorState, inlineStyle));
                    }}
                    style={type.style}
                />
            )}
        </Box>
    );
};