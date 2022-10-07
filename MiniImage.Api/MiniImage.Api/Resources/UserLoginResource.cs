using System.ComponentModel.DataAnnotations;

namespace MiniImage.Api.Resources
{
    public class UserLoginResource
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
