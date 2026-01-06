export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}>

export type CreatePolicyRequest = {
  insuranceType: string
  provider: string
  policyNumber: string
  coverageType: string
  coverageAmount: number
  premium: number
  startDate: string
  endDate: string
}

export type CreateClaimRequest = {
  policyId: string
  claimType: string
  incidentDate: string
  description: string
  estimatedAmount?: number
}

export type CreateQuoteRequest = {
  insuranceType: string
  coverageType: string
  coverageAmount: number
  insuredDetails: Record<string, any>
}
