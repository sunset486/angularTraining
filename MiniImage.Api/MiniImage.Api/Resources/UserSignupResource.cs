using System.ComponentModel.DataAnnotations;

namespace MiniImage.Api.Resources
{
    public class UserSignupResource
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
