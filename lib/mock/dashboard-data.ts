// Mock data for dashboard demos

export type PolicyType = "AUTO" | "HOME" | "HEALTH" | "LIFE" | "TRAVEL" | "BUSINESS"
export type PolicyStatus = "ACTIVE" | "EXPIRING" | "EXPIRED" | "PENDING"
export type ClaimStatus = "SUBMITTED" | "IN_REVIEW" | "IN_PROGRESS" | "COMPLETED" | "REJECTED"

export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface MockPolicy {
  id: string
  type: PolicyType
  name: string
  provider: string
  providerLogo?: string
  policyNumber: string
  status: PolicyStatus
  expiresAt: string
  premium: number
  coverageType: string
  coverageAmount: number
  hasClaim?: boolean
}

export interface ClaimStep {
  name: string
  completed: boolean
  date: string
  description?: string
}

export interface MockClaim {
  id: string
  policyId: string
  type: string
  status: ClaimStatus
  description: string
  submittedAt: string
  estimatedAmount?: number
  steps: ClaimStep[]
}

export interface MockActivity {
  id: string
  type: "EXPIRING" | "PAYMENT" | "CLAIM_UPDATE" | "RENEWAL" | "DOCUMENT"
  title: string
  description: string
  date: string
  amount?: number
  icon: string
}

// User data
export const mockUser: MockUser = {
  id: "user-001",
  name: "Giuliano",
  email: "giuliano@ejemplo.com",
}

export const mockNewUser: MockUser = {
  id: "user-002",
  name: "Usuario",
  email: "nuevo@ejemplo.com",
}

// Policies data
export const mockPolicies: MockPolicy[] = [
  {
    id: "pol-001",
    type: "AUTO",
    name: "Toyota Hilux 2024",
    provider: "MAPFRE",
    policyNumber: "POL-2024-001234",
    status: "ACTIVE",
    expiresAt: "2025-08-15",
    premium: 450000,
    coverageType: "Todo Riesgo",
    coverageAmount: 150000000,
  },
  {
    id: "pol-002",
    type: "HOME",
    name: "Departamento Centro",
    provider: "La Consolidada",
    policyNumber: "POL-2024-005678",
    status: "EXPIRING",
    expiresAt: "2025-01-28",
    premium: 180000,
    coverageType: "Integral",
    coverageAmount: 500000000,
  },
  {
    id: "pol-003",
    type: "HEALTH",
    name: "Plan Familiar Premium",
    provider: "ASISMED",
    policyNumber: "POL-2024-009012",
    status: "ACTIVE",
    expiresAt: "2025-06-30",
    premium: 850000,
    coverageType: "Premium",
    coverageAmount: 200000000,
  },
]

// Policy with active claim
export const mockPoliciesWithClaim: MockPolicy[] = mockPolicies.map((policy) =>
  policy.id === "pol-001" ? { ...policy, hasClaim: true } : policy
)

// Claim data
export const mockClaim: MockClaim = {
  id: "CLM-2024-0042",
  policyId: "pol-001",
  type: "Colisión",
  status: "IN_PROGRESS",
  description: "Colisión en estacionamiento de shopping",
  submittedAt: "2025-01-10",
  estimatedAmount: 8500000,
  steps: [
    {
      name: "Reportado",
      completed: true,
      date: "10 Ene",
      description: "Siniestro registrado correctamente",
    },
    {
      name: "En revisión",
      completed: true,
      date: "12 Ene",
      description: "Documentación verificada",
    },
    {
      name: "Perito asignado",
      completed: true,
      date: "15 Ene",
      description: "Juan Martínez - Tel: 0981 234 567",
    },
    {
      name: "Inspección",
      completed: false,
      date: "20 Ene",
      description: "Pendiente visita del perito",
    },
    {
      name: "Resolución",
      completed: false,
      date: "Pendiente",
      description: "Esperando informe final",
    },
  ],
}

// Activities data
export const mockActivities: MockActivity[] = [
  {
    id: "act-001",
    type: "EXPIRING",
    title: "Póliza por vencer",
    description: "Tu seguro de Hogar vence el 28 de Enero",
    date: "Hace 2 días",
    icon: "AlertTriangle",
  },
  {
    id: "act-002",
    type: "PAYMENT",
    title: "Pago procesado",
    description: "Débito automático - Seguro Auto",
    amount: 450000,
    date: "15 Ene 2025",
    icon: "CreditCard",
  },
  {
    id: "act-003",
    type: "DOCUMENT",
    title: "Documento disponible",
    description: "Certificado de cobertura actualizado",
    date: "10 Ene 2025",
    icon: "FileText",
  },
]

// Activities for user with claim
export const mockActivitiesWithClaim: MockActivity[] = [
  {
    id: "act-claim-001",
    type: "CLAIM_UPDATE",
    title: "Perito asignado",
    description: "Juan Martínez visitará tu vehículo",
    date: "Hoy",
    icon: "UserCheck",
  },
  {
    id: "act-claim-002",
    type: "CLAIM_UPDATE",
    title: "Inspección programada",
    description: "20 de Enero, 10:00 - 12:00",
    date: "Hace 1 día",
    icon: "Calendar",
  },
  ...mockActivities.slice(1),
]

// Insurance types for suggestions
export const insuranceTypes = [
  {
    id: "auto",
    type: "AUTO" as PolicyType,
    name: "Auto",
    description: "Protege tu vehículo",
    icon: "Car",
    popular: true,
  },
  {
    id: "home",
    type: "HOME" as PolicyType,
    name: "Hogar",
    description: "Protege tu casa",
    icon: "Home",
    popular: true,
  },
  {
    id: "health",
    type: "HEALTH" as PolicyType,
    name: "Salud",
    description: "Cuida tu bienestar",
    icon: "Heart",
    popular: true,
  },
  {
    id: "life",
    type: "LIFE" as PolicyType,
    name: "Vida",
    description: "Protege a tu familia",
    icon: "Shield",
    popular: false,
  },
  {
    id: "travel",
    type: "TRAVEL" as PolicyType,
    name: "Viaje",
    description: "Viaja tranquilo",
    icon: "Plane",
    popular: false,
  },
]

// Quick actions
export const quickActions = [
  {
    id: "policies",
    label: "Mis Pólizas",
    icon: "FileText",
    href: "/policies",
  },
  {
    id: "claim",
    label: "Reportar Siniestro",
    icon: "AlertCircle",
    href: "/claims/new",
  },
  {
    id: "assistance",
    label: "Asistencia",
    icon: "Phone",
    href: "/assistance",
  },
  {
    id: "payments",
    label: "Pagos",
    icon: "CreditCard",
    href: "/payments",
  },
]

// Helper functions
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-PY", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("es-PY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function getDaysUntilExpiry(dateString: string): number {
  const today = new Date()
  const expiryDate = new Date(dateString)
  const diffTime = expiryDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getPolicyIcon(type: PolicyType): string {
  const icons: Record<PolicyType, string> = {
    AUTO: "Car",
    HOME: "Home",
    HEALTH: "Heart",
    LIFE: "Shield",
    TRAVEL: "Plane",
    BUSINESS: "Building",
  }
  return icons[type]
}
