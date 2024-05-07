using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IEmployeeRepository
    {
        IEnumerable<Employee> GetAll();
        Employee GetById(int id);
        Task<Employee> AddEmployeeAsync(Employee emp);
        Task<Employee> UpdateEmployeeAsync(int id, Employee emp);
        Task<Employee> DeleteEmployeeAsync(int id);
    }
}
