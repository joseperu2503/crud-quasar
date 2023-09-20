
import { useToken } from '@/composables/useToken'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export function useAuth() {
  const { validateToken, removeToken } = useToken()
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  const verifyAuth = () => {
    const { isValid, decodedToken } = validateToken()

    if (isValid) {
      user.value = {
        name: decodedToken.name,
        id: decodedToken.id,
        email: decodedToken.email
      }
    } else {
      removeToken()
      user.value = null;
    }

    return isValid;
  }

  return {
    verifyAuth
  }
}
