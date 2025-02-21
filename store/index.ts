// import { create } from 'zustand';
import { createStore } from 'zustand/vanilla';
import { CurrencyStore, initialCurrencyState } from './currency-slice';
import { FirebaseImageStore, ImageMetadata, initialImageOutputState } from './image-store-slice';
import { initialUserState, UserStore } from './user-store-slice';


// export type CurrencyStateActions = {
//     currency: string
//     exchangeRate: number | undefined | null
//     setCurrency: (input: string) => void
//     setExchangeRate: (input: number | null | undefined) => void
// }

export type GlobalActions = {
    isFirebaseLoading: boolean
    setFirebaseLoading: (input: boolean) => void
}


export type SanskritiStore = FirebaseImageStore & UserStore & CurrencyStore & GlobalActions

// export const createSanskritiStore = () => {
//     return createStore<SanskritiStore>()(
//         persist(
//             (set) => ({
//                 ...initialImageOutputState,
//                 ...initialUserState,
//                 currency: 'USD',
//                 exchangeRate: null,
//                 setImages: (images) => set({ images }),
//                 addImage: (image: ImageMetadata) =>
//                     set((state) => ({
//                         images: [...state.images, image],
//                     })),
//                 setLatestImage: (image: ImageMetadata) => set({ latestImage: image }),
//                 fetchImagesFromStorage: async () => {
//                     try {
//                         const response = await fetch('/api/images/database');
//                         const images = await response.json();
//                         set({ images: images });
//                     } catch (error) {
//                         console.error('Error fetching images from Storage', error);
//                     }
//                 },
//                 setColorizationInProgress: async (input) => {
//                     set(() => ({ colorizationInProgress: input }));
//                 },
//                 setShouldColorize: async (input) => {
//                     set(() => ({ shouldColorize: input }));
//                 },
//                 getOrCreateUser: async (input) => {
//                     try {
//                         const response = await fetch('/api/user/create', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ userId: input }),
//                         });
//                         const fetchedUser = await response.json();
//                         console.log(JSON.stringify(fetchedUser));
//                         set({ currentUser: fetchedUser });
//                     } catch (error) {
//                         console.error('Failed to create or fetch user', error);
//                     }
//                 },
//                 debitUserCredit: async (input) => {
//                     try {
//                         const response = await fetch('/api/user/debit', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify({ userId: input }),
//                         });
//                         const fetchedUser = await response.json();
//                         console.log(JSON.stringify(fetchedUser));
//                         set({ currentUser: fetchedUser });
//                     } catch (error) {
//                         console.error('Failed to debit user credit', error);
//                     }
//                 },
//                 updateUserCredits: async (input) => {
//                     try {
//                         const response = await fetch('/api/user/update', {
//                             method: 'POST',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                             },
//                             body: JSON.stringify(input),
//                         });
//                         const fetchedUser = await response.json();
//                         set({ currentUser: fetchedUser });
//                     } catch (error) {
//                         console.error('Failed to update user credits', error);
//                     }
//                 },
//                 setCurrency: async (input) => {
//                     set(() => ({ currency: input }));
//                 },
//                 setExchangeRate: async (input) => {
//                     set(() => ({ exchangeRate: input }));
//                 },
//             }),
//             {
//                 name: 'sanskriti-store', // Unique name for the storage
//                 storage: createJSONStorage(() => localStorage),
//                 skipHydration: true
//                 // getStorage: () => localStorage, // Use localStorage (or sessionStorage if preferred)
//             }
//         )
//     );
// };

export const createSanskritiStore = () => {
    return createStore<SanskritiStore>((set) => ({
        ...initialImageOutputState,
        ...initialUserState,
        ...initialCurrencyState,
        isFirebaseLoading: false,
        setImages: (images) => set({ images }),
        addImage: (image: ImageMetadata) => set((state) => ({
            images: [...state.images, image]
        })),
        setLatestImage: (image: ImageMetadata) => set({ latestImage: image }),
        fetchImagesFromStorage: async () => {
            set({ isFirebaseLoading: true })
            try {
                const response = await fetch('/api/images/database');
                const images = await response.json();
                set({ images: images })
            } catch (error) {
                console.error("Error fetching images from Storage", error)
            } finally {
                set({ isFirebaseLoading: false })
            }

        },
        setColorizationInProgress: async (input) => {
            set(() => ({ colorizationInProgress: input }))
        },
        setShouldColorize: async (input) => {
            set(() => ({ shouldColorize: input }))
        },
        getOrCreateUser: async (input) => {
            try {

                const response = await fetch("/api/user/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "userId": input }),
                    // credentials: 'include'
                })
                const fetchedUser = await response.json()

                console.log(JSON.stringify(fetchedUser))

                set({ currentUser: fetchedUser })

            } catch (error) {
                console.error("Failed to create or fetch user", error)
            }
        },
        debitUserCredit: async (input) => {
            try {

                const response = await fetch("/api/user/debit", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "userId": input }),
                    // credentials: 'include'
                })
                const fetchedUser = await response.json()

                console.log(JSON.stringify(fetchedUser))

                set({ currentUser: fetchedUser })

            } catch (error) {
                console.error("Failed to create or fetch user", error)
            }
        },
        updateUserCredits: async (input) => {
            try {

                const response = await fetch("/api/user/update", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(input),
                    // credentials: 'include'
                })
                const fetchedUser = await response.json()
                set({ currentUser: fetchedUser })

            } catch (error) {
                console.error("Failed to create or fetch user", error)
            }
        },
        setCurrency: async (input) => {
            set(() => ({ currency: input }))
        },
        setExchangeRate: async (input) => {
            set(() => ({ exchangeRate: input }))
        },
        setFirebaseLoading: async (input) => {
            set(() => ({ isFirebaseLoading: input }))
        },
    }));
}