import type { Role } from '../types/userTypes';

const rank: Record<Role, number> = { editor: 1, admin: 2 };

export function hasAtLeast(userRole: Role | undefined, minRole: Role) {
    if (!userRole) return false;
    return rank[userRole] >= rank[minRole];
}