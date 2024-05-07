using Solid.Core.Entities;

namespace EmployeesServer.Models
{
    public class EmployeePostModel
    {
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateOnly EntryDate { get; set; }

        public DateOnly BirthDate { get; set; }
        public Kind KindOf { get; set; }
       
        public List<EmployeeRolePostModel> Roles { get; set; }
    }
}
