import { StatusBar, Style } from '@capacitor/status-bar';
import { useQuasar } from 'quasar'


export function useStatusBar() {

  const $q = useQuasar()
  $q.addressbarColor.set('#1976D2')

  const setBackgroundColorWhite = () => {
    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#FFFFFF' });
      StatusBar.setStyle({ style: Style.Light })
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }

  const setBackgroundColorPrimary = () => {
    if ($q.platform.is.nativeMobile) {
      StatusBar.setBackgroundColor({ color: '#1976D2' });
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setStyle({ style: Style.Dark })
    }
  }

  return {
    setBackgroundColorWhite,
    setBackgroundColorPrimary
  }
}
