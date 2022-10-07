using MiniImage.Api.Models.Auth;
using System.Security.Claims;

namespace MiniImage.Api.Services.Interfaces
{
    public interface ITokenService
    {
        string GenerateBearerToken(User user, List<Claim> roleClaims);
        List<Claim> GetTokenClaims(string token);
    }
}
