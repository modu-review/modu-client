import {MouseEvent, useMemo} from 'react';
import {LucideIcon} from '@/shared/ui/icons';

type Props = {
  file: File;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  onRemove: () => void;
};

export default function ImageUploadPreview({file, progress, status, onRemove}: Props) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const fileSize = useMemo(() => formatFileSize(file.size), [file.size]);

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    onRemove();
  };

  return (
    <div className={`relative border rounded-md py-3 px-4 overflow-hidden ${status === 'error' ? 'bg-red-100 border-red-200 text-red-500' : ''}`}>
      {status === 'uploading' && (
        <div
          className={`absolute inset-0 bg-lightBlue`}
          style={{width: `${progress}%`, transition: 'all 300ms ease-out'}}
        />
      )}
      <div className="relative flex justify-between">
        <div className="flex items-center gap-2">
          <LucideIcon name="FileUp" className="w-8 h-8" />
          <div>
            <p className="text-sm font-semibold mb-1">{file.name}</p>
            <p className="text-xs text-gray-600">{fileSize}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'uploading' && <p className="text-sm font-semibold">{progress}%</p>}
          <button onClick={handleRemove}>
            <LucideIcon name="X" className="w-5 h-5 hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
