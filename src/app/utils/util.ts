import { Rol } from "app/core/user/user.types";

export function validateAdmin(roles: Rol[]): boolean {
    const validate = roles.filter(e => e.name === 'admin');
    if (validate.length > 0) {
        return true
    } else {
        return false
    }
}