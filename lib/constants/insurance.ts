import { InsuranceType, PolicyStatus, ClaimStatus, QuoteStatus } from '@prisma/client'

export const INSURANCE_TYPE_LABELS: Record<InsuranceType, string> = {
  AUTO: 'Vehículo',
  HEALTH: 'Salud',
  LIFE: 'Vida',
  HOME: 'Hogar',
  MOTORCYCLE: 'Motocicleta',
  TRAVEL: 'Viaje',
  BUSINESS: 'Negocio',
  OTHER: 'Otro',
}

export const POLICY_STATUS_LABELS: Record<PolicyStatus, string> = {
  ACTIVE: 'Activa',
  EXPIRED: 'Vencida',
  CANCELLED: 'Cancelada',
  PENDING: 'Pendiente',
  SUSPENDED: 'Suspendida',
}

export const POLICY_STATUS_COLORS: Record<PolicyStatus, string> = {
  ACTIVE: 'text-primary bg-primary/10',
  EXPIRED: 'text-destructive bg-destructive/10',
  CANCELLED: 'text-muted-foreground bg-muted',
  PENDING: 'text-secondary bg-secondary/10',
  SUSPENDED: 'text-orange-600 bg-orange-100',
}

export const CLAIM_STATUS_LABELS: Record<ClaimStatus, string> = {
  SUBMITTED: 'Enviado',
  UNDER_REVIEW: 'En Revisión',
  APPROVED: 'Aprobado',
  REJECTED: 'Rechazado',
  IN_PROGRESS: 'En Progreso',
  COMPLETED: 'Completado',
  CANCELLED: 'Cancelado',
}

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  PENDING: 'Pendiente',
  RECEIVED: 'Recibido',
  ACCEPTED: 'Aceptado',
  REJECTED: 'Rechazado',
  EXPIRED: 'Expirado',
}
