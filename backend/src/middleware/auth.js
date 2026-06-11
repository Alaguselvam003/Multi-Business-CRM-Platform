const jwt = require('jsonwebtoken');

// Basic Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Module-Based Permission Guard
// Mocks a DB check for permissions based on user role
const requirePermission = (moduleName, action) => {
  return (req, res, next) => {
    const { role } = req.user;
    
    // Super Admin & Company Admin have full access
    if (role === 'Super Admin' || role === 'Company Admin') {
      return next();
    }

    // Role-based logic mockup
    const rolePermissions = {
      'Sales Executive': { Leads: ['Read', 'Write', 'Update'], Customers: ['Read', 'Write', 'Update'] },
      'Manager': { Leads: ['Read', 'Write', 'Update', 'Delete'], Customers: ['Read', 'Write', 'Update', 'Delete'], Tasks: ['Read', 'Write', 'Update', 'Delete'] },
      'Support Executive': { Tickets: ['Read', 'Write', 'Update'] },
      'HR': { Employees: ['Read', 'Write', 'Update', 'Delete'] },
      'Employee': { Tasks: ['Read', 'Update'] },
      'Viewer': { Leads: ['Read'], Customers: ['Read'], Tasks: ['Read'] }
    };

    const permissions = rolePermissions[role]?.[moduleName] || [];
    if (!permissions.includes(action)) {
      return res.status(403).json({ message: `Forbidden: Requires ${action} permission for ${moduleName}` });
    }

    next();
  };
};

// Department-Based Guard
const requireDepartment = (departmentName) => {
  return (req, res, next) => {
    const { role, department } = req.user;
    if (role === 'Super Admin' || role === 'Company Admin') return next();
    
    if (department !== departmentName) {
      return res.status(403).json({ message: `Forbidden: Requires access to ${departmentName} department` });
    }
    next();
  };
};

module.exports = { authMiddleware, requirePermission, requireDepartment };
