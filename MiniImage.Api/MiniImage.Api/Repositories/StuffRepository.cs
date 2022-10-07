using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Data;
using MiniImage.Api.Models;
using MiniImage.Api.Repositories.Interfaces;

namespace MiniImage.Api.Repositories
{
    public class StuffRepository : Repository<Stuff>, IStuffRepository
    {
        private MiniImageDataContext MiniImageDataContext
        {
            get { return Context; }
        }
        public StuffRepository(MiniImageDataContext context)
            : base(context)
        { }

        public async Task<IEnumerable<Stuff>> GetAllWithCategoriesAsync()
        {
            return await MiniImageDataContext.Stuffs
                .Include(s => s.Category)
                .ToListAsync();
        }

        public Task<Stuff> GetWithCategoriesByIdAsync(int id)
        {
            return MiniImageDataContext.Stuffs
                .Include(s => s.Category)
                .FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}
