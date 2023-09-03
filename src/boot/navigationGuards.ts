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
        return;
      }
      // setBackgroundColorPrimary()
      next();
      return
    }

    if (to.meta?.redirect) {
      if (validToken()) {
        router.push('/dashboard');
        return;
      }
      // setBackgroundColorWhite()
      next();
      return
    }
    next();
  })

  router.afterEach((to, from) => {
    const { setBackgroundColorWhite, setBackgroundColorPrimary } = useStatusBar()

    if (to.meta?.requiresAuth) {
      setBackgroundColorPrimary()
      return
    }

    if (to.meta?.redirect) {
      setBackgroundColorWhite()
      return
    }
  })
})
