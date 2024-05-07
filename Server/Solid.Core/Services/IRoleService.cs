using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IRoleService
    {
        IEnumerable<Role> GetAll();
        Role GetById(int id);
        Task<Role> AddRoleAsync(Role r);
        Task<Role> UpdateRoleAsync(int id, Role r);
        Task<Role> DeleteRoleAsync(int id);
    }
}
