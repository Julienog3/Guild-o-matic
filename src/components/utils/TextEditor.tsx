import React, { useEffect, useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

interface TextEditorProps {
  handleChange: (change: string) => void;
}

const TextEditor = ({ handleChange }: TextEditorProps): JSX.Element => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const onBoldClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onItalicClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const onHeadingClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  const isButtonToggled = (style: string): boolean => {
    const inlineStyle = editorState.getCurrentInlineStyle();
    return inlineStyle.has(style);
  };

  useEffect(() => {
    const content = editorState.getCurrentContent();
    const rawObject = convertToRaw(content);
    const markdownString = draftToMarkdown(rawObject);

    handleChange(markdownString);
  }, [editorState]);

  return (
    <div className="bg-main-blue w-full h-full relative p-4 rounded-lg border border-light-blue text-white prose">
      <div className="flex gap-4 mb-4 border-b border-light-blue pb-4">
        <button
          type="button"
          onMouseDown={(e): void => onBoldClick(e)}
          className={`w-10 h-10 rounded p-2 ${
            isButtonToggled('BOLD') ? 'bg-accent-blue' : 'bg-light-blue'
          }`}
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={(e): void => onItalicClick(e)}
          className={`w-10 h-10 rounded p-2 ${
            isButtonToggled('ITALIC') ? 'bg-accent-blue' : 'bg-light-blue'
          }`}
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={(e): void => onHeadingClick(e)}
          className={`w-10 h-10 rounded p-2 ${
            isButtonToggled('header-one') ? 'bg-accent-blue' : 'bg-light-blue'
          }`}
        >
          H
        </button>
      </div>
      <div className="cursor-pointer relative prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
        <Editor editorState={editorState} onChange={setEditorState} />
      </div>
    </div>
  );
};

export default TextEditor;
