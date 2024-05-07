using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Role> AddRoleAsync(Role r)
        {
            if (_context.Roles.ToList().Find(x => x.Name == r.Name) != null)
                throw new Exception("תפקיד קים במערכת");
                _context.Roles.AddAsync(r);
            await _context.SaveChangesAsync();
            return r;
        }

        public async Task<Role> DeleteRoleAsync(int id)
        {
            if (_context.Roles.ToList().Find(x => x.Id == id) != null)
            {
                _context.Roles.Remove(_context.Roles.ToList().Find(x => x.Id == id));
                await _context.SaveChangesAsync();
                return _context.Roles.ToList().Find(x => x.Id == id);
            }
            return null;
        }

        public  IEnumerable<Role> GetAll()
        {
            return  _context.Roles;
        }

        public Role GetById(int id)
        {
            return _context.Roles.Find(id);
        }

        public async Task<Role> UpdateRoleAsync(int id, Role r)
        {
            if (_context.Roles.ToList().Find(x => x.Name == r.Name) != null)
                throw new Exception("תפקיד קים במערכת");
            var update = _context.Roles.ToList().Find(e => e.Id == id);
            if (update != null)
            {
                update.Name = r.Name;
                update.IsAdminstrative = r.IsAdminstrative;
                await _context.SaveChangesAsync();
                return update;
            }
            return null;
        }
    }
}
