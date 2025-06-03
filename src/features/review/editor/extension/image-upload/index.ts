import {mergeAttributes, Node, ReactNodeViewRenderer} from '@tiptap/react';
import {ImageUploadNode as ImageUploadNodeComponent} from './ui/ImageUploadNode';
import {ImageUploadNodeOptions} from './model/type';

declare module '@tiptap/react' {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUploadNode: (options?: ImageUploadNodeOptions) => ReturnType;
    };
  }
}

const ImageUploadNode = Node.create<ImageUploadNodeOptions>({
  name: 'imageUpload',
  group: 'block',
  draggable: true,
  selectable: true,
  atom: true,

  addOptions() {
    return {
      accept: 'image/*',
      maxSize: 0,
      upload: undefined,
      onError: undefined,
    };
  },

  addAttributes() {
    return {
      accept: {
        default: this.options.accept,
      },
      maxSize: {
        default: this.options.maxSize,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-upload"]',
      },
    ];
  },

  renderHTML({HTMLAttributes}) {
    return ['div', mergeAttributes({'data-type': 'image-upload'}, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadNodeComponent);
  },

  addCommands() {
    return {
      setImageUploadNode:
        (options = {}) =>
        ({commands}) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default ImageUploadNode;
