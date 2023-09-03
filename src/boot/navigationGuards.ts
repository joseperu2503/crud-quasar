import { boot } from 'quasar/wrappers'
import { useToken } from '@/composables/useToken'
import { useStatusBar } from '@/composables/useStatusBar'

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const { removeToken, validToken } = useToken()
    const { setBackgroundColorWhite, setBackgroundColorPrimary } = useStatusBar()

    if (to.meta?.requiresAuth) {
      if (!validToken()) {
        removeToken()
        router.push('/login');
      }
      setBackgroundColorPrimary()
      next();
      return
    }

    if (to.meta?.redirect) {
      if (validToken()) {
        router.push('/dashboard');
      }
      setBackgroundColorWhite()
      next();
      return
    }

    next();
  })
})
