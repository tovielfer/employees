using Solid.Core.Entities;
using Solid.Core.Repositories;

namespace Solid.Data.Repositories
{
    public class LoginRepository:ILoginRepository
    {
        private readonly DataContext _context;
        public LoginRepository(DataContext context)
        {
            _context = context;
        }

        public Login Login(Login l)
        {
            return _context.Logins.ToList().Find(x => x.UserName == l.UserName && x.Password == l.Password);
        }
    }
}
