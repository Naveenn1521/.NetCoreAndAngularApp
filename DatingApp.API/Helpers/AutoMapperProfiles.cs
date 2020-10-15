using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForDetailsDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
           opt.MapFrom(src =>
               src.Photos.FirstOrDefault(p => p.IsMain).Url))
               .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                src.DateOfBirth.CalcuclateAge()
               ));
            CreateMap<User, UserListDto>()
             .ForMember(dest => dest.PhotoUrl, opt =>
             opt.MapFrom(src =>
                 src.Photos.FirstOrDefault(p => p.IsMain).Url))
                  .ForMember(dest => dest.Age, opt => opt.MapFrom(src =>
                src.DateOfBirth.CalcuclateAge()
               ));
            CreateMap<Photo, PhotosForDetailsDto>();
            CreateMap<UserForUpdateDTO,User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDTO, User>();
        }
    }
}