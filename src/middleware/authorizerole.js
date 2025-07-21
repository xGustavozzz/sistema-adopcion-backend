// middleware/authorizerole.js
const authorizeRole = (allowedRoles, rolePropertyName = 'rol') => {
    return (req, res, next) => {
        if (!req.user) {
            console.log('authorizeRole: req.user no definido.');
            return res.status(401).json({ error: 'Acceso denegado. No autenticado.' });
        }

        let userRole = null;

        if (req.user[rolePropertyName]) {
            userRole = req.user[rolePropertyName];
        } else if (req.user.rol) {
            userRole = req.user.rol;
        } else if (req.user.role) {
            userRole = req.user.role;
        } else if (rolePropertyName === 'isAdmin' && req.user.isAdmin === true) {
            userRole = 'admin';
        }

        // --- CAMBIOS PARA DEPURACIÓN ---
        // Elimina espacios en blanco al inicio/final y convierte a minúsculas para una comparación robusta
        const cleanUserRole = typeof userRole === 'string' ? userRole.trim().toLowerCase() : userRole;
        const cleanAllowedRoles = allowedRoles.map(role => role.trim().toLowerCase());

        console.log(`authorizeRole: Rol del usuario detectado (original): '${userRole}' (longitud: ${typeof userRole === 'string' ? userRole.length : 'N/A'})`);
        console.log(`authorizeRole: Rol del usuario detectado (limpio): '${cleanUserRole}' (longitud: ${typeof cleanUserRole === 'string' ? cleanUserRole.length : 'N/A'})`);
        console.log(`authorizeRole: Roles permitidos (limpios): [${cleanAllowedRoles.map(r => `'${r}'`).join(', ')}]`);
        // --- FIN CAMBIOS PARA DEPURACIÓN ---

        if (userRole === null) {
            console.log('authorizeRole: No se pudo determinar el rol del usuario.');
            return res.status(403).json({ error: 'Acceso denegado. Rol de usuario no definido o no reconocido.' });
        }

        // Compara el rol limpio del usuario con los roles permitidos limpios
        if (cleanAllowedRoles.includes(cleanUserRole)) {
            next();
        } else {
            console.log(`authorizeRole: Acceso denegado. Rol '${userRole}' no autorizado para esta ruta.`);
            res.status(403).json({ error: 'Acceso denegado. No tienes los permisos necesarios.' });
        }
    };
};

module.exports = authorizeRole;