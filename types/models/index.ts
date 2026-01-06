import { Prisma } from '@prisma/client'

// User with relations
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    policies: true
    claims: true
    quotes: true
  }
}>

// Policy with relations
export type PolicyWithRelations = Prisma.PolicyGetPayload<{
  include: {
    user: true
    claims: true
    documents: true
    renewals: true
  }
}>

// Claim with relations
export type ClaimWithRelations = Prisma.ClaimGetPayload<{
  include: {
    user: true
    policy: true
    documents: true
    activities: true
  }
}>

// Quote with providers
export type QuoteWithProviders = Prisma.QuoteGetPayload<{
  include: {
    providers: true
  }
}>

// Simplified types for UI
export type PolicySummary = {
  id: string
  policyNumber: string
  insuranceType: string
  provider: string
  status: string
  premium: number
  endDate: Date
}

export type ClaimSummary = {
  id: string
  claimNumber: string
  claimType: string
  status: string
  estimatedAmount: number | null
  submittedAt: Date
}
