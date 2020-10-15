using System.Threading.Tasks;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Interfaces
{
    public interface IAuthRepositary
    {
          Task<User> Register(User user,string password);

          Task<User> Login(string username, string password);

          Task <bool> UserExists(string username);
    }
}