using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System.Text.RegularExpressions;


namespace Solid.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository e)
        {
            _employeeRepository = e;
        }
        public Task<Employee> AddEmployeeAsync(Employee emp)
        {

            if (emp == null || !Regex.IsMatch(emp.Tz, @"^\d{9}$") || !Regex.IsMatch(emp.FirstName, @"^[א-תa-zA-Z]{2,100}$") || emp.BirthDate == default || emp.EntryDate == default)
                throw new Exception("אחד או יותר מהפרטים שהוזנו שגוי");
            if (emp.Roles.Any(r => r.StartDate.CompareTo(emp.EntryDate) < 0))
                throw new Exception("על תאריך כניסה לתפקיד להיות מאוחר מתאריך תחילת העבודה.");
            if (emp.Roles.Any(r => emp.Roles.Count(x => x.RoleId == r.RoleId) > 1))
                throw new Exception("לא ניתן לכתוב שני תפקידים זהים לאותו עובד");
                try
            {
                return _employeeRepository.AddEmployeeAsync(emp);
            }
            catch (Exception ex) { throw ex; }
        }

        public Task<Employee> DeleteEmployeeAsync(int id)
        {
            return _employeeRepository.DeleteEmployeeAsync(id);
        }

        public IEnumerable<Employee> GetAll()
        {
            return _employeeRepository.GetAll().Where(e => e.Status);
        }

        public Employee GetById(int id)
        {
            return _employeeRepository.GetById(id);
        }

        public Task<Employee> UpdateEmployeeAsync(int id, Employee emp)
        {


            if (emp == null || !Regex.IsMatch(emp.Tz, @"^\d{9}$") || !Regex.IsMatch(emp.FirstName, @"^[א-תa-zA-Z]{2,100}$") || emp.BirthDate == default || emp.EntryDate == default)
                throw new Exception("אחד או יותר מהפרטים שהוזנו שגוי");
            if (emp.Roles.Any(r => r.StartDate.CompareTo(emp.EntryDate) < 0))
                throw new Exception("על תאריך כניסה לתפקיד להיות מאוחר מתאריך תחילת העבודה.");
            try
            {
                return _employeeRepository.UpdateEmployeeAsync(id, emp);
            }
            catch (Exception ex) { throw ex; }
        }
    }
}
