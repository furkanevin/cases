export interface FirstTableRow {
  name: string
  totalTask: string
  progress: number
  hours: string
  image: string
}

export interface SecondTableRow {
  name: string
  status: 'OverDue' | 'Active' | 'Not Assigned'
  success: string
  rate: string
}

// data for packages
export type Card = {
  title: string
  shortTag: string
  price: string
  examContent: string
  date: string
  progress: number
  btn: string
  desc: string
}
