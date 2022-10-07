using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace MiniImage.Api.Models.Auth
{
    public class Role: IdentityRole<Guid>
    {
    }
}
