using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Interfaces;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepositary _repo;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepositary repo, IConfiguration configuration, IMapper mapper)
        {
            _mapper = mapper;
            _configuration = configuration;
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            userDto.UserName = userDto.UserName.ToLower();

            if (await _repo.UserExists(userDto.UserName))
                return BadRequest("UserName already exists");

            var userToCreate = new User
            {
                UserName = userDto.UserName
            };
            var createduser = await _repo.Register(userToCreate, userDto.PassWord);
            return StatusCode(201);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserDto userdto)
        {
            var userfromdb = await _repo.Login(userdto.UserName.ToLower(), userdto.PassWord);

            if (userfromdb == null)
                return Unauthorized();

            var claims = new[]
            {
                 new Claim(ClaimTypes.NameIdentifier,userfromdb.Id.ToString()),
                 new Claim(ClaimTypes.Name,userfromdb.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

           var user = _mapper.Map<UserListDto>(userfromdb);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}