import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import { adminApi } from '../adminApi';

const SAFE_LINK = /^(https?:\/\/|mailto:|tel:)/i;
const MAX_IMAGE = 3 * 1024 * 1024;

function Btn({ label, icon, active, disabled, onClick }) {
  return (
    <button type="button" title={label} aria-label={label} className={active ? 'is-on' : ''} disabled={disabled} onClick={onClick}>
      <i className={`fa-solid ${icon}`} aria-hidden="true" />
    </button>
  );
}

/**
 * Rich text editor (TipTap) for blog articles and job descriptions. Outputs HTML which the API sanitises again before it is stored.
 * `images` enables the inline image button (uploads go through the admin API to the project's Supabase storage).
 */
export default function RichTextEditor({ value, onChange, images = false, placeholder = 'Start writing…' }) {
  const fileRef = useRef(null);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: 'noopener noreferrer' } } }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({ inline: false }),
    ],
    content: value || '',
    editorProps: { attributes: { class: 'cms-content ProseMirror', 'data-placeholder': placeholder } },
    onUpdate: ({ editor: ed }) => onChange(ed.isEmpty ? '' : ed.getHTML()),
  });

  const state = useEditorState({
    editor,
    selector: ({ editor: ed }) =>
      ed && {
        bold: ed.isActive('bold'),
        italic: ed.isActive('italic'),
        underline: ed.isActive('underline'),
        bullet: ed.isActive('bulletList'),
        ordered: ed.isActive('orderedList'),
        quote: ed.isActive('blockquote'),
        link: ed.isActive('link'),
        left: ed.isActive({ textAlign: 'left' }),
        center: ed.isActive({ textAlign: 'center' }),
        right: ed.isActive({ textAlign: 'right' }),
        justify: ed.isActive({ textAlign: 'justify' }),
        block: ed.isActive('heading', { level: 2 }) ? 'h2' : ed.isActive('heading', { level: 3 }) ? 'h3' : ed.isActive('heading', { level: 4 }) ? 'h4' : 'p',
        canUndo: ed.can().undo(),
        canRedo: ed.can().redo(),
      },
  });

  if (!editor || !state) return <div className="adm-editor" style={{ minHeight: 380 }} />;
  const chain = () => editor.chain().focus();

  const setBlock = (event) => {
    const v = event.target.value;
    if (v === 'p') chain().setParagraph().run();
    else chain().toggleHeading({ level: Number(v.slice(1)) }).run();
  };

  const setLink = () => {
    const previous = editor.getAttributes('link').href || '';
    const url = window.prompt('Link address (https://…, mailto: or tel:). Leave empty to remove the link.', previous);
    if (url === null) return;
    if (url.trim() === '') return chain().extendMarkRange('link').unsetLink().run();
    if (!SAFE_LINK.test(url.trim())) return setError('Links must start with https://, http://, mailto: or tel:');
    setError('');
    return chain().extendMarkRange('link').setLink({ href: url.trim(), target: '_blank' }).run();
  };

  const onPickImage = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return setError('Please choose a JPG, PNG, WebP or GIF image.');
    if (file.size > MAX_IMAGE) return setError('The image must be 3 MB or smaller.');
    try {
      setError('');
      const { url } = await adminApi.uploadImage(file);
      chain().setImage({ src: url, alt: '' }).run();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="adm-editor">
        <div className="adm-editor-bar" role="toolbar" aria-label="Formatting">
          <Btn label="Undo" icon="fa-rotate-left" disabled={!state.canUndo} onClick={() => chain().undo().run()} />
          <Btn label="Redo" icon="fa-rotate-right" disabled={!state.canRedo} onClick={() => chain().redo().run()} />
          <span className="sep" />
          <select aria-label="Paragraph style" value={state.block} onChange={setBlock}>
            <option value="p">Paragraph</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
          </select>
          <span className="sep" />
          <Btn label="Bold" icon="fa-bold" active={state.bold} onClick={() => chain().toggleBold().run()} />
          <Btn label="Italic" icon="fa-italic" active={state.italic} onClick={() => chain().toggleItalic().run()} />
          <Btn label="Underline" icon="fa-underline" active={state.underline} onClick={() => chain().toggleUnderline().run()} />
          <span className="sep" />
          <Btn label="Bullet list" icon="fa-list-ul" active={state.bullet} onClick={() => chain().toggleBulletList().run()} />
          <Btn label="Numbered list" icon="fa-list-ol" active={state.ordered} onClick={() => chain().toggleOrderedList().run()} />
          <Btn label="Blockquote" icon="fa-quote-right" active={state.quote} onClick={() => chain().toggleBlockquote().run()} />
          <span className="sep" />
          <Btn label="Align left" icon="fa-align-left" active={state.left} onClick={() => chain().setTextAlign('left').run()} />
          <Btn label="Align center" icon="fa-align-center" active={state.center} onClick={() => chain().setTextAlign('center').run()} />
          <Btn label="Align right" icon="fa-align-right" active={state.right} onClick={() => chain().setTextAlign('right').run()} />
          <Btn label="Justify" icon="fa-align-justify" active={state.justify} onClick={() => chain().setTextAlign('justify').run()} />
          <span className="sep" />
          <Btn label="Link" icon="fa-link" active={state.link} onClick={setLink} />
          {images && <Btn label="Insert image" icon="fa-image" onClick={() => fileRef.current?.click()} />}
          <Btn label="Clear formatting" icon="fa-eraser" onClick={() => chain().unsetAllMarks().clearNodes().run()} />
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={onPickImage} />
        </div>
        <div className="adm-editor-body">
          <EditorContent editor={editor} />
        </div>
      </div>
      {error && <p className="adm-fielderr">{error}</p>}
    </div>
  );
}
