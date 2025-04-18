import {useCallback} from 'react';
import {useEditor, useEditorState} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import {useUpdateGlobalError} from '@/entities/error';
import {createClientError} from '@/shared/lib/utils/client-error';

function useReviewEditor() {
  const updateError = useUpdateGlobalError();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'custom-editor-image',
        },
      }),
      TextAlign.configure({types: ['heading', 'paragraph'], defaultAlignment: 'left'}),
      Link.configure({
        autolink: true,
        linkOnPaste: true,
        defaultProtocol: 'https',
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'cursor-pointer text-blue-500 hover:text-blue-600',
        },
        isAllowedUri: (url, ctx) => {
          const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

          if (!ctx.defaultValidate(parsedUrl.href) || url.startsWith('./')) {
            const linkError = createClientError('INVALID_LINK_URL');
            updateError(linkError);

            return false;
          }

          const disallowedProtocols = ['javascript', 'data', 'ftp', 'file', 'mailto', 'http'];
          const protocol = parsedUrl.protocol.replace(':', '');

          if (protocol !== 'https' || disallowedProtocols.includes(protocol)) {
            const protocolError = createClientError('INVALID_LINK_PROTOCOL');
            updateError(protocolError);

            return false;
          }

          return true;
        },
        shouldAutoLink: url => url.startsWith('https://'),
      }).extend({
        inclusive: false,
      }),
      ImageResize,
    ],
    editorProps: {
      scrollThreshold: 100,
      scrollMargin: 100,
      attributes: {
        class:
          'prose prose-p:my-3 prose-h1:font-bold lg:prose-lg focus:outline-none prose-h1:text-[1.9em] md:prose-h1:text-[2.1em]',
      },
    },
    immediatelyRender: false,
    autofocus: true,
    shouldRerenderOnTransaction: false,
    content:
      '<h1>이건 제목 1인데요..</h1><p>이건 본문 내용 1입니다.. 미리보기 화면 테스트용으로 아무 글이나 작성해보려고 합니다..</p><ul><li><p>그래서 이렇게 리스트도 하나 두고요..</p></li><li><p>아래에 하나 더 두고요..</p><ul><li><p>그리고 이렇게 하위 리스트도 하나 둘게요..</p></li></ul></li></ul><blockquote><p>그리고 인용구로 뭔가 있어보이게 적어볼게요..</p></blockquote><p>그리고 이렇게 본문 조금 더 쓰는데 이번엔 좀 더 길게 적어서 줄바꿈이 일어나도록 해볼게요.. 그래서 아무 말이나 적고 있습니다.. 줄 바꿈은 일어났는데 조금만 더 적어볼게요..</p><h2>그리고 이렇게 제목 2를 둘게요..</h2><blockquote><p>여기는 바로 있어보이게 인용구로 시작할게요..</p></blockquote><p>그리고 여기서 잠깐 이 <strong>글자</strong>만 굵게 처리해볼게요.. 그리고 이 <em>글자</em>는 기울일게요.. 그리고 이 <s>글자</s>는 줄을 그어볼게요... 그리고 조금 더 작성하다가 이 <strong><em><s>글자</s></em></strong>는 모두 해볼게요...</p><p>그리고 여기는 위와 다르게 숫자 리스트를 둘까요..?</p><ol><li><p>여기는 1로 시작하는데요.. 이번엔 하위 리스트를 2개 둘게요..?</p><ol><li><p>이렇게.. 그럼 여기도 1로 시작하죠..?</p></li><li><p>여기는 2로 시작하네요..?!</p></li></ol></li><li><p>그럼 여기는 2로 다시 시작하구요..</p></li></ol><h2 style="text-align: center">그럼 여기는 제목 3이겠네요..</h2><p style="text-align: center">여기는 특별히 정렬을 주로 사용해볼게요..</p><p style="text-align: center">이렇게 가운데에 좀 글을 써보다가..그냥<br>맘대로 줄바꿈도 해보구요...</p><p style="text-align: right">오른쪽에도 써보고..</p><p style="text-align: left">왼쪽에도 써볼게요...</p>',
  });

  const editorState = useEditorState({
    editor,
    selector: snapshot => {
      const {editor} = snapshot;

      if (!editor) return null;

      return {
        isHeading1: editor.isActive('heading', {level: 1}),
        isHeading2: editor.isActive('heading', {level: 2}),
        isHeading3: editor.isActive('heading', {level: 3}),
        isBold: editor.isActive('bold'),
        isItalic: editor.isActive('italic'),
        isStrike: editor.isActive('strike'),
        isBlockquote: editor.isActive('blockquote'),
        isBulletList: editor.isActive('bulletList'),
        isOrderedList: editor.isActive('orderedList'),
        isAlignLeft: editor.isActive({textAlign: 'left'}),
        isAlignCenter: editor.isActive({textAlign: 'center'}),
        isAlignRight: editor.isActive({textAlign: 'right'}),
        isLink: editor.isActive('link'),
      };
    },
  });

  const editorRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !editor) return;

      const handleClick = (e: MouseEvent) => {
        if (!editor.isFocused && node.contains(e.target as Node)) {
          editor.commands.focus('end');
        }
      };

      node.addEventListener('click', handleClick);

      return () => node.removeEventListener('click', handleClick);
    },
    [editor],
  );

  return {editor, editorState, editorRef};
}

export default useReviewEditor;
