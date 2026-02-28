import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, deleteEmployee, updateEmployee } from '../services/api';
import EditEmployeeModal from '../components/EditEmployeeModal';

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

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchEmployees();
  }, [currentPage]);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(currentPage, itemsPerPage);
      setEmployees(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Failed to fetch employees', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
      setDeleteConfirm(null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handleUpdate = async (id: number, data: any) => {
    try {
      await updateEmployee(id, data);
      fetchEmployees();
      setEditingEmployee(null);
    } catch (err: any) {
      throw new Error(err.response?.data?.message || 'Failed to update employee');
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>📋 Employee Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/employees/new')} className="btn btn-primary">
            ➕ Add Employee
          </button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">
            🏠 Dashboard
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          Loading employees...
        </div>
      ) : employees.length === 0 ? (
        <div className="card empty-state">
          <h3>No Employees Found</h3>
          <p>Start by adding your first employee!</p>
          <button onClick={() => navigate('/employees/new')} className="btn btn-primary" style={{ marginTop: '20px' }}>
            ➕ Add First Employee
          </button>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>National ID</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Laptop</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td><strong>#{emp.id}</strong></td>
                    <td><strong>{emp.firstName} {emp.lastName}</strong></td>
                    <td>{emp.nationalId}</td>
                    <td>{emp.telephone}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>{emp.laptopManufacturer} {emp.laptopModel} ({emp.laptopSerial})</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          onClick={() => setEditingEmployee(emp)} 
                          className="btn btn-success btn-icon"
                          title="Edit"
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          onClick={() => setDeleteConfirm(emp.id)} 
                          className="btn btn-danger btn-icon"
                          title="Delete"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
              >
                ← Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'active' : ''}
                >
                  {page}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleUpdate}
        />
      )}

      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>⚠️ Confirm Delete</h2>
            <p style={{ marginBottom: '25px', color: '#6b7280' }}>
              Are you sure you want to delete this employee? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn btn-danger">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
