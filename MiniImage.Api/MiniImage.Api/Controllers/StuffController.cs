using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniImage.Api.Models;
using MiniImage.Api.Resources;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StuffController : ControllerBase
    {
        private readonly IStuffService _stuffService;

        public StuffController(IStuffService stuffService)
        {
            _stuffService = stuffService;
        }

        [HttpGet("/get-stuff")]
        public async Task<ActionResult<IEnumerable<Stuff>>> GetAllStuff()
        {
            var stuffs = await _stuffService.GetAllStuffs();
            return Ok(stuffs.ToList());
        }

        [HttpGet("/get-one-stuff/{id}")]
        public async Task<IActionResult> GetStuffWithId(int id)
        {
            var stuff = await _stuffService.GetStuffById(id);
            return Ok(stuff);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("/add-new-stuff")]
        public async Task<ActionResult<StuffResource>> AddNewStuff([FromBody] StuffResource resource)
        {
            var newStuff = new Stuff
            {
                Name = resource.Name,
                Price = (decimal)resource.Price,
                CategoryId = resource.CategoryId,
                ImgSource = resource.ImgSource
            };
            var result = await _stuffService.AddNewStuff(newStuff);
            if (result != null)
                return Ok($"Added new product - {newStuff.Name}");

            return StatusCode(500);
        }

        [Authorize(Roles = "admin")]
        [HttpPut("/update-stuff/{id}")]
        public async Task<ActionResult<StuffResource>> UpdateStuff(int id, [FromBody] StuffResource resource)
        {
            var oldStuff = await _stuffService.GetStuffById(id);
            if (oldStuff == null)
                return BadRequest("Category does not exist in database");

            var newStuff = new Stuff
            {
                Id = oldStuff.Id,
                Name = resource.Name,
                Price = (decimal)resource.Price,
                CategoryId = resource.CategoryId,
                ImgSource = resource.ImgSource
            };
            await _stuffService.UpdateStuff(oldStuff, newStuff);
            return Ok($"Updated product - {newStuff.Name}");
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("/delete-stuff/{id}")]
        public async Task<IActionResult> DeleteStuff(int id)
        {
            var stuff = await _stuffService.GetStuffById(id);
            if (stuff == null)
                return BadRequest("Product does not exist in database");

            await _stuffService.DeleteStuff(stuff);
            return Ok("Deleted product from database");
        }
    }
}
