import { atom } from 'recoil'
import { IAdCard } from 'types/ad'
import { IMediaChannelData, IStatusData } from 'types/types'

export const adListState = atom<IAdCard[]>({
  key: 'adList',
  default: [],
})

export const mediaListState = atom<IMediaChannelData[]>({
  key: 'mediaList',
  default: [],
})

export interface PickedDate {
  start: Date
  end: Date
}

export const pickedDate = atom<PickedDate>({
  key: 'pickedDate',
  default: { start: new Date('2022-03-01'), end: new Date('2022-03-07') },
})

export const integratedAdData = atom<IStatusData[]>({
  key: 'integratedAdData',
  default: [],
})
