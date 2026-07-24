export enum AttendeeStatus {
  Going = 'GOING',
  NotGoing = 'NOT_GOING',
  Waitlist = 'WAITLIST',
  Pending = 'PENDING',
  Declined = 'DECLINED',
}

export interface AttendeeDto {
  id: string
  eventId: string
  userId: string
  status: AttendeeStatus
  createdAt: string
  updatedAt: string
}
