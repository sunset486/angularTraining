using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MiniImage.Api.Models.Auth
{
    public class User : IdentityUser<Guid>
    {
        [Required]
        public override string UserName { get; set; }

        [Required]
        public override string Email { get; set; }
    }
}
