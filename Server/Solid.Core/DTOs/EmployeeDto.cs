using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public List<EmployeeRoleDto> Roles { get; set; }
        public DateOnly BirthDate { get; set; }
        public Kind KindOf { get; set; }
        public DateOnly EntryDate { get; set; }

    }
}
