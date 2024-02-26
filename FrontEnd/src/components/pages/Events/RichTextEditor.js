import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';
const RichTextEditor = ({ setvalue, config }) => {
   const editor = useRef(null);
   return <JoditEditor ref={editor} onChange={content => setvalue(content)} config={config} />
};
export default RichTextEditor;