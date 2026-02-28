import { useState, FormEvent } from 'react';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  nationalId: string;
  telephone: string;
  email: string;
  department: string;
  position: string;
  laptopManufacturer: string;
  laptopModel: string;
  laptopSerial: string;
}

interface Props {
  employee: Employee;
  onClose: () => void;
  onSave: (id: number, data: any) => Promise<void>;
}

export default function EditEmployeeModal({ employee, onClose, onSave }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    nationalId: employee.nationalId,
    telephone: employee.telephone,
    email: employee.email,
    department: employee.department,
    position: employee.position,
    laptopManufacturer: employee.laptopManufacturer,
    laptopModel: employee.laptopModel,
    laptopSerial: employee.laptopSerial
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSave(employee.id, formData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px' }}>
        <h2>✏️ Edit Employee</h2>

        {error && <div className="alert alert-error">❌ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
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
              <input name="nationalId" value={formData.nationalId} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Telephone *</label>
              <input name="telephone" value={formData.telephone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Department *</label>
              <input name="department" value={formData.department} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input name="position" value={formData.position} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Laptop Manufacturer *</label>
              <input name="laptopManufacturer" value={formData.laptopManufacturer} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Laptop Model *</label>
              <input name="laptopModel" value={formData.laptopModel} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Laptop Serial *</label>
              <input name="laptopSerial" value={formData.laptopSerial} onChange={handleChange} required />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : '💾 Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
