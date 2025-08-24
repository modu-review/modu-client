'use client';

import {DragEvent, useRef, useState} from 'react';
import {ClientError, createClientError} from '@/shared/lib/utils/client-error';

type Props = {
  onFile: (file: File) => void;
  onError: (error: ClientError) => void;
  children?: React.ReactNode;
};

export default function ImageUploadDragArea({onFile, onError, children}: Props) {
  const [dragging, setDragging] = useState(false);
  const dragCounter = useRef(0);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    dragCounter.current = 0;
    setDragging(false);

    const files = event.dataTransfer.files;

    if (!files || files.length === 0) {
      onError(createClientError('NO_IMAGE_SELECTED'));
      return;
    }

    if (files.length > 1) {
      onError(createClientError('TOO_MANY_IMAGES_SELECTED'));
      return;
    }

    onFile(files[0]);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragCounter.current += 1;

    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragCounter.current -= 1;

    if (dragCounter.current === 0) {
      setDragging(false);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`cursor-pointer border-2 rounded-md border-dashed ${dragging ? 'border-boldBlue' : 'border-gray-400'} hover:border-boldBlue`}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {children}
    </div>
  );
}
