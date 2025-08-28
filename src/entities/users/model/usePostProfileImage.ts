import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postProfileImage} from '../apis/api-service';
import {usersQueryKeys} from './query-service';
import {ProfileImage} from './types';

type MutationVariables = {
  imageData: FormData;
  userNickname: string;
};

export function usePostProfileImage() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: ({imageData}: MutationVariables) => postProfileImage(imageData),
    onMutate: async ({userNickname, imageData}) => {
      await queryClient.cancelQueries({queryKey: usersQueryKeys.profileImage(userNickname)});

      const previousImage = queryClient.getQueryData(usersQueryKeys.profileImage(userNickname));
      const imageFile = imageData.get('profileImage');

      let blobUrl: string | undefined;
      if (imageFile instanceof File) {
        blobUrl = URL.createObjectURL(imageFile);
        const updatedImage: ProfileImage = {
          profileImage: blobUrl,
        };

        queryClient.setQueryData(usersQueryKeys.profileImage(userNickname), updatedImage);
      }

      return {previousImage, blobUrl};
    },
    onError: (_, {userNickname}, context) => {
      if (context) {
        queryClient.setQueryData(usersQueryKeys.profileImage(userNickname), context.previousImage);
      }
    },
    onSettled: (_data, _error, {userNickname}, context) => {
      if (context && context.blobUrl) {
        URL.revokeObjectURL(context.blobUrl);
      }

      queryClient.invalidateQueries({queryKey: usersQueryKeys.profileImage(userNickname)});
    },
  });

  return {
    updateProfileImage: mutate,
    ...rest,
  };
}
