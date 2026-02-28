import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../services/api';

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

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>Employee List</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => navigate('/employees/new')} className="btn btn-primary">+ Add Employee</button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Dashboard</button>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : employees.length === 0 ? (
          <p>No employees found. Add your first employee!</p>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
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
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.id}</td>
                      <td>{emp.firstName} {emp.lastName}</td>
                      <td>{emp.nationalId}</td>
                      <td>{emp.telephone}</td>
                      <td>{emp.email}</td>
                      <td>{emp.department}</td>
                      <td>{emp.position}</td>
                      <td>{emp.laptopManufacturer} {emp.laptopModel} ({emp.laptopSerial})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Previous
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
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
