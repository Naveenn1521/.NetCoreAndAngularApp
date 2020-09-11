using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserDto
    {
        [Required]
        public string   UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength =4,ErrorMessage="Password should be more than 4 charecters")]
        public string PassWord { get; set; }
    }
}