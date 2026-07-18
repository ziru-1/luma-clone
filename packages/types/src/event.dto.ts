export interface EventDto {
  id: string
  hostId: string
  name: string
  isPublic: boolean
  startTime: string
  endTime: string
  location: string
  capacity: number | null
  priceCents: number | null
  requiresApproval: boolean
  createdAt: string
  updatedAt: string
}
