
import { useToken } from '@/composables/useToken'
import { useRouter } from 'vue-router';

export function useLogout() {
  const { removeToken } = useToken()
  const router = useRouter();

  const logout = () => {
    removeToken()
    router.push('login')
  }

  return {
    logout,
  }
}
