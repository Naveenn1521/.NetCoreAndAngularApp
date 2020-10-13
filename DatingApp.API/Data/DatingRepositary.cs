using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepositary : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepositary(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
           _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
           var photofromDb = await _context.Photos.FirstOrDefaultAsync(x => x.Id == id);
           return photofromDb;
        }

        public async Task<User> GetUser(int id)
        {
            var userfromdb = await _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == id);
            return userfromdb;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(x => x.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        
    }
}