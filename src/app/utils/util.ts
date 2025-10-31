import { Rol } from "app/core/user/user.types";
import { environment } from "environments/environment";

export function validateAdmin(roles: Rol[]): boolean {
    const validate = roles.filter(e => e.name === environment.superAdmin);
    if (validate.length > 0) {
        return true
    } else {
        return false
    }
}