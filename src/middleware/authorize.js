function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (!req.usuario) return res.status(401).json({ message: 'No autenticado' });
    if (req.usuario.role !== requiredRole) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
}

module.exports = authorizeRole;