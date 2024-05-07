using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public enum Kind { זכר,נקבה}
    public class Employee
    {
        public int Id { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<EmployeeRole> Roles { get; set; }
        public DateOnly BirthDate { get; set; }
        public Kind KindOf { get; set; }
        public bool Status { get; set; }
        public DateOnly EntryDate { get; set; }
    }
}