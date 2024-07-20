import { create } from 'zustand'

interface SectorMainImgStoreState {
  mainImage:string
  setMainImage:(mainImage:string) => void
}

export const useSectorMainImgState = create<SectorMainImgStoreState>()((set) => ({
  mainImage: '',
  setMainImage: (mainImage) => set({mainImage}),
}))