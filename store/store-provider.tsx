'use client'

import { type ReactNode, createContext, useContext, useRef } from 'react'
import { type StoreApi, useStore } from 'zustand'

import { type SanskritiStore, createSanskritiStore } from '@/store'


export const SanskritiStoreContext = createContext<StoreApi<SanskritiStore> | null>(
    null,
)


export interface SanskritiStoreProviderProps {
    children: ReactNode
}

export const SanskritiStoreProvider = ({
    children,
}: SanskritiStoreProviderProps) => {
    const storeRef = useRef<StoreApi<SanskritiStore>>(null)
    if (!storeRef.current) {
        storeRef.current = createSanskritiStore()
    }

    return (
        <SanskritiStoreContext.Provider value={storeRef.current}>
            {children}
        </SanskritiStoreContext.Provider>
    )
}

export const useSanskritiStore = <T,>(
    selector: (store: SanskritiStore) => T,
): T => {
    const sanskritiStoreContext = useContext(SanskritiStoreContext)

    if (!sanskritiStoreContext) {
        throw new Error(`useSanskritiStore must be use within SanskritiStoreProvider`)
    }

    return useStore(sanskritiStoreContext, selector)
}