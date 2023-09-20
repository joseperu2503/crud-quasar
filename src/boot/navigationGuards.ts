import { boot } from 'quasar/wrappers'
import { useStatusBar } from '@/composables/useStatusBar'
import { SplashScreen } from '@capacitor/splash-screen';
import { useAuth } from '@/composables/useAuth';

export default boot(({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const { verifyAuth } = useAuth()
    const isValid = verifyAuth()

    if (to.meta?.requiresAuth) {
      if (!isValid) {
        router.push('/login');
        return
      }
      next();
      return
    }

    if (to.meta?.redirect) {
      if (isValid) {
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
