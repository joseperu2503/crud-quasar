import { boot } from 'quasar/wrappers'
import { useToken } from '@/composables/useToken'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const { removeToken, validToken } = useToken()

    if (to.meta?.requiresAuth) {
      if (!validToken()) {
        removeToken()
        router.push('/login');
      }
      next();
    }

    if (to.meta?.redirect) {
      if (validToken()) {
        router.push('/dashboard');
      }
      next();
    }

    next();
  })
})
