using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDTO
    {
        [Required]
        public string   UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4,ErrorMessage="Password should be more than 4 charecters")]
        public string PassWord { get; set; }
         [Required]
        public string Gender { get; set; }
         [Required]
        public string KnownAs { get; set; }
         [Required]
        public DateTime DateOfBirth { get; set; }
         [Required]
        public string City { get; set; }
         [Required]
        public string Country { get; set; }
         [Required]
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }

        public UserForRegisterDTO()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}