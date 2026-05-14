// ============================================================
// ROLES — RBAC definitions
// ============================================================

export const ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  WAITER: 'waiter',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  [ROLES.OWNER]: [
    'dashboard:view',
    'dashboard:manage',
    'mesas:create',
    'mesas:update',
    'mesas:delete',
    'meseros:create',
    'meseros:update',
    'meseros:delete',
    'transacciones:view',
    'ajustes:manage',
    'settings:manage',
  ],
  [ROLES.MANAGER]: [
    'dashboard:view',
    'mesas:create',
    'mesas:update',
    'meseros:view',
    'transacciones:view',
    'ajustes:view',
  ],
  [ROLES.WAITER]: [
    'dashboard:view',
    'transacciones:view',
  ],
}

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}