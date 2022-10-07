using MiniImage.Api.Models;

namespace MiniImage.Api.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> GetCategoryById(int id);
        Task<Category> AddNewCategory(Category category);
        Task UpdateCategory(Category oldCategory, Category newCategory);
        Task DeleteCategory(Category category);
    }
}
