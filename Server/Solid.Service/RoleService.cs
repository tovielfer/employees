using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;

namespace Solid.Service
{
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _RoleRepository;
        public RoleService(IRoleRepository e)
        {
            _RoleRepository = e;
        }
        public Task<Role> AddRoleAsync(Role role)
        {
            try
            {
                return _RoleRepository.AddRoleAsync(role);
            }catch (Exception ex) { throw ex; }
        }

        public Task<Role> DeleteRoleAsync(int id)
        {
            return (_RoleRepository.DeleteRoleAsync(id));
        }

        public IEnumerable<Role> GetAll()
        {
            return _RoleRepository.GetAll();
        }

        public Role GetById(int id)
        {
            return _RoleRepository.GetById(id);
        }

        public Task<Role> UpdateRoleAsync(int id, Role r)
        {
            try
            {
                return _RoleRepository.UpdateRoleAsync(id, r);
            }catch(Exception ex) { throw ex; }
        }
    }
}
