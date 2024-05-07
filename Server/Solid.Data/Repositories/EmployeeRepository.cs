using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;

namespace Solid.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Employee> AddEmployeeAsync(Employee emp)
        {
            if (_context.Employees.ToList().Find(x => x.Tz == emp.Tz) != null)
                throw new Exception("מספר זהות קים במערכת");
            var roles = _context.Roles.ToList();
            var missingRoleIds = emp.Roles.Select(r => r.RoleId).Except(roles.Select(role => role.Id));
            if (missingRoleIds.Any())
                throw new Exception("תפקיד לא קים");
            emp.Roles = emp.Roles.Select(r => new EmployeeRole
            {
                EmployeeId = emp.Id,
                Employee = emp,
                Role = roles.Find(role => role.Id == r.RoleId),
                RoleId = r.RoleId,
                StartDate = r.StartDate
            }).ToList();
            _context.Employees.AddAsync(emp);
            await _context.SaveChangesAsync();
            return emp;
        }

        public async Task<Employee> DeleteEmployeeAsync(int id)
        {
            if (_context.Employees.Find(id) != null)
            {
                _context.Employees.Find(id).Status = false;
                await _context.SaveChangesAsync();
                return _context.Employees.Find(id);
            }
            return null;
        }

        public IEnumerable<Employee> GetAll()
        {
            return _context.Employees.Include(e => e.Roles).ThenInclude(er => er.Role);
        }

        public Employee GetById(int id)
        {
            return _context.Employees.Include(e => e.Roles).ThenInclude(er => er.Role).FirstOrDefault(e => e.Id == id);
        }

        //public async Task<Employee> UpdateEmployeeAsync(int id, Employee emp)
        //{
        //    var update = _context.Employees.Find(id);
        //    if (update != null)
        //    {
        //        update.FirstName = emp.FirstName;
        //        update.Status = emp.Status;
        //        update.Tz = emp.Tz;
        //        update.BirthDate = emp.BirthDate;
        //        update.LastName = emp.LastName;
        //        update.KindOf = emp.KindOf;
        //        update.EntryDate = emp.EntryDate;
        //        var roles = _context.Roles.ToList();
        //        var missingRoleIds = emp.Roles.Select(r => r.RoleId).Except(roles.Select(role => role.Id));
        //        if (missingRoleIds.Any())
        //            throw new Exception("תפקיד לא קים");
        //        update.Roles = emp.Roles.Select(r => new EmployeeRole
        //        {
        //            EmployeeId = update.Id,
        //            Employee = update,
        //            Role = roles.Find(role => role.Id == r.RoleId),
        //            RoleId = r.RoleId,
        //            StartDate = r.StartDate
        //        }).ToList();
        //        await _context.SaveChangesAsync();
        //        return update;
        //    }
        //    return null;
        //}


        public async Task<Employee> UpdateEmployeeAsync(int id, Employee emp)
        {
            var update = _context.Employees.Include(e => e.Roles).FirstOrDefault(e => e.Id == id);
            if (update != null)
            {
                update.FirstName = emp.FirstName;
                update.Status = emp.Status;
                update.Tz = emp.Tz;
                update.BirthDate = emp.BirthDate;
                update.LastName = emp.LastName;
                update.KindOf = emp.KindOf;
                update.EntryDate = emp.EntryDate;

                // Remove previous roles
                _context.EmployeeRoles.RemoveRange(update.Roles);

                var roles = _context.Roles.ToList();
                var missingRoleIds = emp.Roles.Select(r => r.RoleId).Except(roles.Select(role => role.Id));
                if (missingRoleIds.Any())
                    throw new Exception("תפקיד לא קים");

                // Add new roles
                update.Roles = emp.Roles.Select(r => new EmployeeRole
                {
                    EmployeeId = update.Id,
                    Employee = update,
                    Role = roles.Find(role => role.Id == r.RoleId),
                    RoleId = r.RoleId,
                    StartDate = r.StartDate
                }).ToList();

                await _context.SaveChangesAsync();
                return update;
            }
            return null;
        }

    }
}
