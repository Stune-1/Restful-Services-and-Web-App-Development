import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🏢 RTB Equipment Distribution System</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          🚪 Logout
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '25px', 
        borderRadius: '15px', 
        marginBottom: '30px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ color: '#667eea', marginBottom: '10px' }}>Welcome to RTB Equipment Management</h2>
        <p style={{ color: '#6b7280', fontSize: '15px' }}>
          Manage laptop distribution to employees efficiently. Add, view, edit, and delete employee records with their assigned equipment.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/employees/new')}>
          <h3>➕ Add New Employee</h3>
          <p>Register a new employee with laptop assignment details</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/employees')}>
          <h3>📋 View All Employees</h3>
          <p>Browse, search, edit, and manage employee records</p>
        </div>

        <div className="dashboard-card" style={{ borderLeftColor: '#10b981' }}>
          <h3 style={{ color: '#10b981' }}>💼 Quick Stats</h3>
          <p>View employee and equipment distribution statistics</p>
        </div>
      </div>
    </div>
  );
}
