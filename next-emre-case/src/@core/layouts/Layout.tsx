// ** React Import
import { useEffect, useRef } from 'react'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'
import BlankLayout from './BlankLayout'

const Layout = (props: LayoutProps) => {
  // ** Props
  const { hidden, children, settings, saveSettings } = props

  // ** Ref
  const isCollapsed = useRef(settings.navCollapsed)

  useEffect(() => {
    if (hidden) {
      if (settings.navCollapsed) {
        saveSettings({ ...settings, navCollapsed: false, layout: 'vertical', navHidden: true })
        isCollapsed.current = true
      } else {
        saveSettings({ ...settings, layout: 'vertical', navHidden: false })
      }
    } else {
      if (isCollapsed.current) {
        saveSettings({ ...settings, navCollapsed: true, layout: settings.lastLayout, navHidden: false })
        isCollapsed.current = false
      } else {
        saveSettings({ ...settings, layout: settings.lastLayout, navHidden: false })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hidden])

  return <BlankLayout {...props}>{children}</BlankLayout>
}

export default Layout
