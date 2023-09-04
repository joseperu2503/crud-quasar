import { boot } from 'quasar/wrappers'
import { useToken } from '@/composables/useToken'
import { useStatusBar } from '@/composables/useStatusBar'
import { SplashScreen } from '@capacitor/splash-screen';

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const { removeToken, validToken } = useToken()

    if (to.meta?.requiresAuth) {
      if (!validToken()) {
        removeToken()
        router.push('/login');
        return;
      }
      next();
      return
    }

    if (to.meta?.redirect) {
      if (validToken()) {
        router.push('/dashboard');
        return;
      }
      next();
      return
    }
    next();
  })

  router.afterEach(async (to, from) => {
    const { setBackgroundColorWhite, setBackgroundColorPrimary } = useStatusBar()

    if (to.meta?.requiresAuth) {
      setBackgroundColorPrimary()
      SplashScreen.hide();
      return
    }

    if (to.meta?.redirect) {
      setBackgroundColorWhite()
      SplashScreen.hide();
      return
    }
  })
})
