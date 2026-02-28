import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../services/api';

export default function EmployeeForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    telephone: '',
    email: '',
    department: '',
    position: '',
    laptopManufacturer: '',
    laptopModel: '',
    laptopSerial: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createEmployee(formData);
      setSuccess(true);
      setTimeout(() => navigate('/employees'), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>➕ Register New Employee</h1>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
          ← Back to Dashboard
        </button>
      </div>

      <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {success && (
          <div className="alert alert-success">
            ✅ Employee registered successfully! Redirecting...
          </div>
        )}
        
        {error && (
          <div className="alert alert-error">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h3 style={{ color: '#667eea', marginBottom: '20px', fontSize: '20px' }}>
            👤 Personal Information
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>First Name *</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Samanta" />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="ISHIMWE" />
            </div>

            <div className="form-group">
              <label>National ID *</label>
              <input name="nationalId" value={formData.nationalId} onChange={handleChange} required placeholder="1200071091330" />
            </div>

            <div className="form-group">
              <label>Telephone *</label>
              <input name="telephone" value={formData.telephone} onChange={handleChange} required placeholder="0788888888" />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="samanta@rtb.gov.rw" />
            </div>
          </div>

          <h3 style={{ color: '#667eea', marginTop: '30px', marginBottom: '20px', fontSize: '20px' }}>
            💼 Employment Details
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Department *</label>
              <input name="department" value={formData.department} onChange={handleChange} required placeholder="Human Resource" />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input name="position" value={formData.position} onChange={handleChange} required placeholder="Manager" />
            </div>
          </div>

          <h3 style={{ color: '#667eea', marginTop: '30px', marginBottom: '20px', fontSize: '20px' }}>
            💻 Laptop Assignment
          </h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Laptop Manufacturer *</label>
              <input name="laptopManufacturer" value={formData.laptopManufacturer} onChange={handleChange} required placeholder="HP" />
            </div>

            <div className="form-group">
              <label>Laptop Model *</label>
              <input name="laptopModel" value={formData.laptopModel} onChange={handleChange} required placeholder="Envy" />
            </div>

            <div className="form-group">
              <label>Laptop Serial Number *</label>
              <input name="laptopSerial" value={formData.laptopSerial} onChange={handleChange} required placeholder="3400" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '30px', width: '100%', padding: '15px' }} disabled={loading}>
            {loading ? '⏳ Registering...' : '✅ Register Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}
