export function checkRole(allowedRoles) {
  return (req, res, next) => {
    const userRole = req.session?.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
}
