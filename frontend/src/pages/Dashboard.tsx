import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1>RTB Equipment Distribution System</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/employees/new')}>
          <h3 style={{ marginBottom: '12px', color: '#2563eb' }}>Add Employee</h3>
          <p style={{ color: '#6b7280' }}>Register new employee with laptop details</p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/employees')}>
          <h3 style={{ marginBottom: '12px', color: '#2563eb' }}>View Employees</h3>
          <p style={{ color: '#6b7280' }}>Browse all registered employees</p>
        </div>
      </div>
    </div>
  );
}
