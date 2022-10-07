using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IStuffService _stuffService;

        public ShoppingCartController(IStuffService stuffService)
        {
            _stuffService = stuffService;
        }

        [HttpGet("/get-items")]
        public async Task<IActionResult> GetFullCart()
        {
            return Ok();
        }
    }
}
