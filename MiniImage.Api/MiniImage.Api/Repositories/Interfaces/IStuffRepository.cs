using MiniImage.Api.Models;

namespace MiniImage.Api.Repositories.Interfaces
{
    public interface IStuffRepository : IRepository<Stuff>
    {
        Task<IEnumerable<Stuff>> GetAllWithCategoriesAsync();
        Task<Stuff> GetWithCategoriesByIdAsync(int id);
    }
}
