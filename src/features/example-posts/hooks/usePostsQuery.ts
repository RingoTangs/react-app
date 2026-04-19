import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api/getPosts'
import { postQueryKeys } from '../model/queryKeys'

export const usePostsQuery = () => {
  return useQuery({
    queryKey: postQueryKeys.preview(),
    queryFn: getPosts,
  })
}
