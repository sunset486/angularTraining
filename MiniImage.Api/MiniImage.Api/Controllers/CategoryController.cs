using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MiniImage.Api.Models;
using MiniImage.Api.Models.Responses;
using MiniImage.Api.Resources;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("/get-categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllCategory()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(categories.ToList());
        }

        [HttpGet("/get-one-category/{id}")]
        public async Task<IActionResult> GetCategoryWithId(int id)
        {
            var category = await _categoryService.GetCategoryById(id);
            return Ok(category);
        }

        [HttpPost("/add-new-category")]
        public async Task<ActionResult<CategoryResource>> AddNewCategory([FromBody] CategoryResource resource)
        {
            if (resource == null || resource.Name == "")
                return BadRequest("Null resource");

            var category = new Category
            {
                Name = resource.Name
            };
            var result = await _categoryService.AddNewCategory(category);
            if (result == null)
                return Unauthorized("Failed to add");

            return Ok(new CategoryResponse { Name = category.Name});
        }

        [HttpPut("/update-category/{id}")]
        public async Task<ActionResult<CategoryResource>> UpdateCategory(int id, [FromBody] CategoryResource resource)
        {
            var oldCategory = await _categoryService.GetCategoryById(id);
            if (oldCategory == null)
                return BadRequest("Object does not exist in database");

            var newCategory = new Category
            {
                Id = oldCategory.Id,
                Name = resource.Name
            };
            await _categoryService.UpdateCategory(oldCategory, newCategory);
            return Ok($"Updated object from database:\n{newCategory}");
        }

        [HttpDelete("/delete-category/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null)
                return BadRequest("Object does not exist in database");

            await _categoryService.DeleteCategory(category);
            return Ok("Deleted object from database");
        }
    }
}
