using MiniImage.Api.Models;

namespace MiniImage.Api.Repositories.Interfaces
{
    public interface ICategoriesRepository : IRepository<Category>
    {
        Task<IEnumerable<Category>> GetAllCatsAsync();
        Task<Category> GetCatByIdAsync(int id);
    }
}
