import { NextComponentType, NextPageContext } from 'next/types'
import type { ReactElement, ReactNode } from 'react'
import type { PageSpecificSettings } from 'src/@core/context/settingsContext'

declare module 'next' {
  export declare type NextPage<P = {}, IP = P> = NextComponentType<NextPageContext, IP, P> & {
    /**
     * Settings that will be applied to page that overrides global settings
     * Please note that this settings will be applied only to this page
     *
     * ! Some settings can break the layout
     */
    pageSettings?: PageSpecificSettings
    /**
     * Get layout for page
     * @param page Page component to wrap in layout
     * @returns Layout component with page component as child
     */
    getLayout?: (page: ReactElement) => ReactNode
  }
}
