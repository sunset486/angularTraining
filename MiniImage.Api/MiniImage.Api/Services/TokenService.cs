using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using MiniImage.Api.Models.Auth;
using MiniImage.Api.Services.Interfaces;
using MiniImage.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace MiniImage.Api.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;

        public TokenService(IConfiguration config, UserManager<User> userManager)
        {
            _config = config;
            _userManager = userManager;
        }

        public string GenerateBearerToken(User user, List<Claim> roleClaims)
        {
            var claims = CreateGenericClaims(user);
            foreach (var roleClaim in roleClaims)
            {
                claims.Add(roleClaim);
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]));
            var signCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddHours(24),
                signingCredentials: signCredentials
                );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

        public List<Claim> GetTokenClaims(string token)
        {
            var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);
            var claims = new List<Claim>();
            claims.AddRange(jwt.Claims);
            return claims;
        }

        private List<Claim> CreateGenericClaims(User user)
        {
            var genClaims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };
            return genClaims;
        }
    }
}
