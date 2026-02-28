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
      <div style={{ marginBottom: '24px' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">← Back</button>
      </div>

      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '24px' }}>Register New Employee</h2>

        {success && <div className="success">Employee registered successfully!</div>}
        {error && <div className="error" style={{ marginBottom: '16px', padding: '12px', background: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>First Name *</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
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
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <input name="department" value={formData.department} onChange={handleChange} required placeholder="Human Resource" />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input name="position" value={formData.position} onChange={handleChange} required placeholder="Manager" />
            </div>

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

          <button type="submit" className="btn btn-primary" style={{ marginTop: '24px', width: '100%' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register Employee'}
          </button>
        </form>
      </div>
    </div>
  );
}
