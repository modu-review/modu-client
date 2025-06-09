import {PresignedProps, ReviewDetail, ReviewPayload, UploadImageProps} from '../model/type';
import {requestPost} from '@/shared/apis';
import {createClientError} from '@/shared/lib/utils/client-error';
import {TErrorInfo} from '@/shared/apis/request-type';
import {RequestGetError} from '@/shared/apis/request-error';

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

export async function getReviewDetail(reviewId: number) {
  const url = process.env.NEXT_PUBLIC_CLIENT_URL + `/api/reviews/${reviewId}`;
  // const url = process.env.NEXT_PUBLIC_API_URL + `/reviews/${reviewId}`; 실제 요청 주소

  const res = await fetch(url, {
    method: 'GET',
    next: {
      revalidate: false,
      tags: [`review-${reviewId}`],
    },
  });

  if (!res.ok) {
    const {errorCode, message}: TErrorInfo = await res.json();

    throw new RequestGetError({
      status: res.status,
      requestBody: null,
      endpoint: res.url,
      name: errorCode,
      method: 'GET',
      errorCode,
      message,
      errorHandlingType: 'errorBoundary',
    });
  }

  const data: ReviewDetail = await res.json();

  return data;
}
