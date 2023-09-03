import { StatusBar, Style } from '@capacitor/status-bar';
import { useQuasar } from 'quasar'


export function useStatusBar() {

  const $q = useQuasar()
  // $q.addressbarColor.set('#1976D2')

  const setBackgroundColorWhite = () => {
    console.log('setBackgroundColorWhite')
    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });
      StatusBar.setStyle({ style: Style.Light })
    }
  }

  const setBackgroundColorPrimary = () => {
    console.log('setBackgroundColorPrimary')

    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#1976D2' });
      StatusBar.setStyle({ style: Style.Dark })
    }
  }

  return {
    setBackgroundColorWhite,
    setBackgroundColorPrimary
  }
}
