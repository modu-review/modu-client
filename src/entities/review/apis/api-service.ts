import {
  BookmarkPayload,
  CommentPayload,
  DeleteCommentPayload,
  PresignedProps,
  ReviewBookmarks,
  ReviewComments,
  ReviewDetail,
  ReviewPayload,
  UploadImageProps,
} from '../model/type';
import {requestDelete, requestGet, requestPatch, requestPost} from '@/shared/apis';
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

export async function patchReview(data: ReviewPayload, reviewId: number) {
  await requestPatch({
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: `/api/reviews/${reviewId}`,
    body: data,
  });
}

export async function deleteReview(reviewId: number) {
  await requestDelete({
    baseUrl: process.env.NEXT_PUBLIC_CLIENT_URL,
    endpoint: `/api/reviews/${reviewId}`,
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
  // const url = process.env.NEXT_PUBLIC_CLIENT_URL + `/api/reviews/${reviewId}`;
  const url = process.env.NEXT_PUBLIC_API_URL + `/reviews/${reviewId}`;

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

export async function getReviewBookmarks(reviewId: number) {
  return requestGet<ReviewBookmarks>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/bookmarks`,
  });
}

export async function bookmarkReview({userEmail, reviewId}: BookmarkPayload) {
  return requestPost({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/bookmarks`,
    body: {
      userEmail: userEmail,
    },
  });
}

export async function unBookmarkReview({userEmail, reviewId}: BookmarkPayload) {
  return requestDelete({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/bookmarks`,
    body: {
      user_email: userEmail,
    },
  });
}

export async function getReviewComments(reviewId: number, page: number) {
  return requestGet<ReviewComments>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/comments`,
    queryParams: {
      page: page,
    },
  });
}

export async function postReviewComment({userEmail, reviewId, category, content}: CommentPayload) {
  return requestPost({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/comments`,
    body: {
      user_email: userEmail,
      category,
      content,
    },
  });
}

export async function deleteReviewComment({userEmail, commentId, reviewId}: DeleteCommentPayload) {
  return requestDelete({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoint: `/reviews/${reviewId}/comments`,
    body: {
      user_email: userEmail,
      board_id: reviewId,
      comment_id: commentId,
    },
  });
}
