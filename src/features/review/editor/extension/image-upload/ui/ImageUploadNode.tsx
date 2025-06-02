import {NodeViewProps, NodeViewWrapper} from '@tiptap/react';

function ImageUploadNode(props: NodeViewProps) {
  return <NodeViewWrapper className="image-upload-box not-prose py-5" tabIndex={0}></NodeViewWrapper>;
}

export {ImageUploadNode};
