import {useMutation, useQueryClient} from '@tanstack/react-query';
import {deleteProfileImage} from '../apis/api-service';
import {usersQueryKeys} from './query-service';
import {NO_PROFILE_IMAGE_URL} from '../consts/defaultProfileImage';

type MutationVariables = {
  userNickname: string;
};

export function useDeleteProfileImage() {
  const queryClient = useQueryClient();

  const {mutate, ...rest} = useMutation({
    mutationFn: (_variables: MutationVariables) => deleteProfileImage(),
    onMutate: async ({userNickname}) => {
      const queryKey = usersQueryKeys.profileImage(userNickname);

      await queryClient.cancelQueries({queryKey});

      const previousImage = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, {profileImage: NO_PROFILE_IMAGE_URL});

      return {previousImage};
    },
    onError: (_, {userNickname}, context) => {
      if (context) {
        queryClient.setQueryData(usersQueryKeys.profileImage(userNickname), context.previousImage);
      }
    },
    onSettled: (_data, _error, {userNickname}) => {
      queryClient.invalidateQueries({queryKey: usersQueryKeys.profileImage(userNickname)});
    },
  });

  return {
    deleteProfileImage: mutate,
    ...rest,
  };
}
