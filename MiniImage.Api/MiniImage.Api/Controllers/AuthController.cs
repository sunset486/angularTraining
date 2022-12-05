using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Data;
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
        private readonly MiniImageDataContext _context;
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        private readonly ITokenService _tokenService;

        public AuthController(
            MiniImageDataContext context,
            SignInManager<User> signInManager, 
            UserManager<User> userManager, 
            RoleManager<Role> roleManager, 
            ITokenService tokenService)
        {
            _context = context;
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
                var customerRole = await _roleManager.FindByNameAsync("customer");
                await _userManager.AddToRoleAsync(user, customerRole.Name);
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
            var users = await _userManager.Users.ToListAsync();
            List<string> result = new List<string>();

            foreach (var user in users)
            {
                result.Add(user.UserName);
            }

            return Ok(result);
        }
        
        [Authorize(Roles = "admin")]
        [HttpGet("/get-all-roles")]
        public async Task<ActionResult<IEnumerable<Role>>> GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            List<string> result = new List<string>();

            foreach(var role in roles)
            {
                result.Add(role.Name);
            }

            return Ok(result);
        }

        [Authorize(Roles = "admin")]
        [HttpGet("/get-users-with-roles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var users = await _userManager.Users.ToListAsync();
            List<string>? userNames = new List<string>();
            List<string>? userRoles = new List<string>();

            foreach (var user in users)
            {
                userNames.Add(user.UserName);
                userRoles.AddRange(await _userManager.GetRolesAsync(user));
            }

            return Ok(new FetchUsersWithRolesResponse
            {
                Users = userNames,
                UserRoles = userRoles
            });
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/add-role")]
        public async Task<ActionResult<Role>> AddRole([FromBody]RoleResource resource)
        {
            if (resource == null || resource.Name == "")
                return BadRequest("Null resource");

            var role = new Role()
            {
                Name = resource.Name
            };
            await _roleManager.CreateAsync(role);
            return Ok(new RoleResponse { Name = role.Name});
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/add-role-to-user")]
        public async Task<IActionResult> AssignRoleToUser([FromBody] ModifyUserRoleResource resource)
        {
            if (resource == null || resource.RoleName == "" || resource.UserName == "")
                return BadRequest("Null resource");

            var role = await _roleManager.FindByNameAsync(resource.RoleName);
            var user = await _userManager.FindByNameAsync(resource.UserName);
            if (role == null || user == null)
                return BadRequest("User and/or role do not exist");

            var result = await _userManager.AddToRoleAsync(user, role.Name);
            if (result.Succeeded)
                return Ok(new ModifyUserRoleResponse { RoleName = role.Name, UserName = user.UserName});

            return BadRequest(result.Errors.ToList());
        }
    }
}
