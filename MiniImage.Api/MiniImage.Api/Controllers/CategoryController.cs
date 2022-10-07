using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiniImage.Api.Models;
using MiniImage.Api.Resources;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("/get-category")]
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
        public async Task<ActionResult<CategoryResource>> AddNewCategory(Category category)
        {
            var result = await _categoryService.AddNewCategory(category);
            if (result != null)
                return Ok($"Added new object to database:\n{category}");

            return StatusCode(500);
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
