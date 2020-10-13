using System;
using System.Threading.Tasks;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class AuthRepositary : IAuthRepositary
    {
        private readonly DataContext _context;
        public AuthRepositary(DataContext context)
        {
            _context = context;
        }
        public async Task<User> Login(string username, string password)
        {
           var user =   await  _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);
            if (user == null)
                return null;

            if(!VerifyPassword(password,user.PasswordHash,user.PasswordSalt))
                return null;

                return user;
        }

        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computerHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computerHash.Length; i++)
                {
                    if (computerHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;

        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordhash, passwordsalt;
            CreatePasswordHash(password, out passwordhash, out passwordsalt);

            user.PasswordHash = passwordhash;
            user.PasswordSalt = passwordsalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordhash, out byte[] passwordsalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordsalt = hmac.Key;
                passwordhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

            }
        }

        public async Task<bool> UserExists(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == username);

            if (user != null)
                return true;


            return false;
        }
    }
}