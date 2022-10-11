using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Models.Auth;
using MiniImage.Api.Models.Responses;
using MiniImage.Api.Resources;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenService _tokenService;

        public AuthController( 
            SignInManager<User> signInManager, 
            UserManager<User> userManager, 
            RoleManager<Role> roleManager, 
            ITokenService tokenService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
        }

        [EnableCors("BearerPolicy")]
        [HttpPost("/register")]
        public async Task<IActionResult> SignUpUser([FromBody] UserSignupResource resource)
        {
            if (resource == null)
                return BadRequest("Empty data!");
            var user = await _userManager.FindByEmailAsync(resource.Email);
            if (user == null)
            {
                user = new User
                {
                    UserName = resource.UserName,
                    Email = resource.Email,
                };
                var signUpResult = await _userManager.CreateAsync(user, resource.Password);
                if (!signUpResult.Succeeded)
                {
                    var errors = signUpResult.Errors.Select(e => e.Description);
                    return BadRequest(new RegistrationErrorResponse { Errors = errors});
                }
                await _userManager.AddToRoleAsync(user, "customer");
            }
            return Ok(new RegistrationResponse { Email = user.Email, Username = user.UserName});
                
        }

        [EnableCors("BearerPolicy")]
        [HttpPost("/login")]
        public async Task<IActionResult> LogInUser([FromBody] UserLoginResource resource)
        {
            string token;
            var user = await _userManager.FindByEmailAsync(resource.Email);
            if (user == null)
                return BadRequest("User does not exist");

            var passwordCheck = await _signInManager.CheckPasswordSignInAsync(user, resource.Password, lockoutOnFailure:false);
            if (passwordCheck.Succeeded)
            {
                var roleClaims = new List<Claim>();
                var roles = await _userManager.GetRolesAsync(user);
                foreach(var role in roles)
                {
                    roleClaims.Add(new Claim(ClaimTypes.Role, role));
                }
                token = _tokenService.GenerateBearerToken(user, roleClaims);
                var tokenClaims = _tokenService.GetTokenClaims(token);
                await _userManager.AddClaimsAsync(user, tokenClaims);
                await _signInManager.SignInAsync(user, isPersistent: true, token);
            }
            else
                return Unauthorized("Incorrect email/password");

            return Ok(new AuthResponse { isUserAuthenticated = true, Username = user.UserName, Token = token});
        }

        [EnableCors("BearerPolicy")]
        [HttpPost("/logout")]
        public async Task<IActionResult> LogoutUser()
        {
            var loggedInCheck = User.Identity.IsAuthenticated;

            if (loggedInCheck)
                await _signInManager.SignOutAsync();

            return Ok("Signed out");
        }

        [Authorize(Roles = "admin")]
        [HttpGet("/get-all-users")]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var list = await _userManager.Users.ToListAsync();
            return Ok(list);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/add-role")]
        public async Task<ActionResult<Role>> AddRole(string roleName)
        {
            var role = new Role() { Name = roleName };
            await _roleManager.CreateAsync(role);
            return Ok($"New role created - {role.NormalizedName}");
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/add-role-to-user")]
        public async Task<IActionResult> AssignRoleToUser(string roleName, string userName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);
            var user = await _userManager.FindByNameAsync(userName);
            if (role == null || user == null)
                return BadRequest("User and/or role do not exist");

            var result = await _userManager.AddToRoleAsync(user, role.Name);
            if (result.Succeeded)
                return Ok($"Assigned {role.NormalizedName} role to user");

            return BadRequest(result.Errors.ToList());
        }
    }
}
