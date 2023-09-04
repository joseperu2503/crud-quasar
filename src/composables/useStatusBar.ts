import { StatusBar, Style } from '@capacitor/status-bar';
import { useQuasar } from 'quasar'


export function useStatusBar() {

  const $q = useQuasar()
  // $q.addressbarColor.set('#1976D2')

  const setBackgroundColorWhite = async () => {
    console.log('setBackgroundColorWhite')
    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });
      await StatusBar.setStyle({ style: Style.Light })
    }
  }

  const setBackgroundColorPrimary = async () => {
    console.log('setBackgroundColorPrimary')

    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#1976D2' });
      await StatusBar.setStyle({ style: Style.Dark })
    }
  }

  return {
    setBackgroundColorWhite,
    setBackgroundColorPrimary
  }
}
