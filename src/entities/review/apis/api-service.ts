import {requestPost} from '@/shared/apis';
import {PresignedProps, ReviewPayload, UploadImageProps} from '../model/type';
import {createClientError} from '@/shared/lib/utils/client-error';

export async function postReview(data: ReviewPayload) {
  await requestPost({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: '/review',
    body: data,
    withResponse: false,
  });
}

export async function getPresigned(fileType: string) {
  return await requestPost<PresignedProps>({
    endpoint: '/presign',
    body: {
      fileType,
    },
    withResponse: true,
  });
}

export async function uploadImage({
  file,
  fileType,
  imageId,
  presignedUrl,
  onProgress,
  abortSignal,
}: UploadImageProps): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', presignedUrl, true);

    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress({progress});
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(`${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${imageId}.${fileType}`);
      } else {
        reject(createClientError('UPLOAD_FAILED'));
      }
    };

    xhr.onerror = () => {
      reject(createClientError('UPLOAD_FAILED'));
    };

    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        xhr.abort();
        reject(createClientError('UPLOAD_CANCELLED'));
      });
    }

    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
}
