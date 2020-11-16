using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;
        public UsersController(IDatingRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams)
        {
            var currentLoggedInUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repository.GetUser(currentLoggedInUserId);

            userParams.UserId = currentLoggedInUserId;

            if(string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repository.GetUsers(userParams);
            var userToReturndto = _mapper.Map<IEnumerable<UserListDto>>(users);
            Response.Addpagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(userToReturndto);
        }

        [HttpGet("{id}", Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            var usersdto = _mapper.Map<UserForDetailsDto>(user);
            return Ok(usersdto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDTO userForUpdateDTO)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var userfromdb = await _repository.GetUser(id);

            _mapper.Map(userForUpdateDTO, userfromdb);

            if(await _repository.SaveAll())
                return NoContent();

            throw new Exception($"An Error Occured while updating the entries for User {id}");
        }

        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

                var like = await _repository.GetLike(id, recipientId);

                if(like != null)
                    return BadRequest("you have already liked this user");
                if(await _repository.GetUser(recipientId) == null)
                    return NotFound();

                like = new Like { LikerId = id, LikeeId = recipientId };

                _repository.Add<Like>(like);

                if(await _repository.SaveAll())
                    return Ok();

                return BadRequest("Error occured. Please try again");    
        }
        

    }
}