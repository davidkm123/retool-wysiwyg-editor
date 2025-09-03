import React, { useState, useEffect, useRef, useMemo, FC } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Essentials,
  Heading,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  PasteFromOffice,
  SourceEditing,
  TextTransformation,
  TodoList,
  Underline,
  EventInfo,
  Editor,
  // --- naše přidané pluginy ---
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  Alignment,
  FindAndReplace,
  RemoveFormat,
  CodeBlock,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersEssentials,
  WordCount
} from 'ckeditor5';
import { Retool } from '@tryretool/custom-component-support';

import 'ckeditor5/ckeditor5.css';
import './Editor.css';

const LICENSE_KEY = 'GPL';

export const HtmlEditor: FC = () => {
  Retool.useComponentSettings({
    defaultWidth: 12,
    defaultHeight: 36
  });

  const [value, setValue] = Retool.useStateString({
    name: 'value',
    label: 'Default value'
  });

  const [placeholder, _setPlaceholder] = Retool.useStateString({
    name: 'placeholder',
    label: 'Placeholder',
    initialValue: 'Type or paste your content here!'
  });

  const editorContainerRef = useRef(null);
  const divRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<ClassicEditor | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const isInternalChange = useRef(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  useEffect(() => {
    if (!isInternalChange.current && editorInstanceRef.current) {
      const currentContent = editorInstanceRef.current.getData();
      if (currentContent !== value) {
        editorInstanceRef.current.setData(value);
      }
    }
    isInternalChange.current = false;
  }, [value]);

  const onChange = (event: EventInfo, editor: Editor) => {
    isInternalChange.current = true;
    setValue(editor.getData());
  };

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'sourceEditing', '|', 'heading', '|',
            'bold', 'italic', 'underline', '|',
            'link', 'insertImageViaUrl', 'mediaEmbed', 'blockQuote', '|',
            'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent', '|',
            'insertTable', 'alignment', '|',
            'findAndReplace', 'removeFormat', '|',
            'codeBlock', '|',
            'showBlocks', 'specialCharacters', '|',
            'undo', 'redo'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          CloudServices,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          PasteFromOffice,
          SourceEditing,
          TextTransformation,
          TodoList,
          Underline,
          // přidané
          Table,
          TableToolbar,
          TableProperties,
          TableCellProperties,
          Alignment,
          FindAndReplace,
          RemoveFormat,
          CodeBlock,
          ShowBlocks,
          SpecialCharacters,
          SpecialCharactersEssentials,
          WordCount
        ],
        table: {
          contentToolbar: [
            'tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'
          ]
        },
        codeBlock: {
          languages: [
            { language: 'plaintext',  label: 'Plain text' },
            { language: 'sql',        label: 'SQL' },
            { language: 'json',       label: 'JSON' },
            { language: 'javascript', label: 'JavaScript' }
          ]
        },
        balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
        heading: {
          options: [
            { model: 'paragraph' as const, view: 'p',  title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1'  as const, view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2'  as const, view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3'  as const, view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4'  as const, view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5'  as const, view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6'  as const, view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual' as const,
              label: 'Downloadable',
              attributes: { download: 'file' }
            }
          }
        },
        list: {
          properties: { styles: true, startIndex: true, reversed: true }
        },
        placeholder: placeholder
      }
    };
  }, [isLayoutReady]);

  return (
    <div className="main-container">
      <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
        <div className="editor-container__editor">
          <div ref={divRef}>
            {editorConfig && (
              <CKEditor
                editor={ClassicEditor}
                config={editorConfig}
                onChange={onChange}
                // zapneme nativní spellcheck prohlížeče
                // (CKEditor ho obvykle má, tohle je jen pojistka přes root element)
                onReady={(editor) => {
                  editorInstanceRef.current = editor;

                  // WordCount – připnout pod editor
                  try {
                    const anyEditor = editor as any;
                    const wc = anyEditor.plugins.get('WordCount');
                    if (wc && wc.wordCountContainer) {
                      // Připíchnout na konec wrapperu editoru
                      const host = (anyEditor.ui?.view?.element?.parentElement) || divRef.current?.parentElement;
                      if (host) {
                        host.appendChild(wc.wordCountContainer);
                      }
                    }
                  } catch { /* no-op */ }

                  // spellcheck="true" na contentEditable element
                  try {
                    const rootEl = (editor as any).ui?.view?.editable?.element;
                    if (rootEl) rootEl.setAttribute('spellcheck', 'true');
                  } catch { /* no-op */ }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};