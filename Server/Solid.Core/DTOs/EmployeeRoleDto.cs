using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeeRoleDto
    {
        public DateOnly StartDate { get; set; }
        public RoleDto Role { get; set; }
    }
}
