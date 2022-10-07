using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Data;
using MiniImage.Api.Models;
using MiniImage.Api.Repositories.Interfaces;
using System.Security.Cryptography.X509Certificates;

namespace MiniImage.Api.Repositories
{
    public class CategoriesRepository : Repository<Category>, ICategoriesRepository
    {

        public MiniImageDataContext MiniImageDataContext 
        { 
            get { return Context as MiniImageDataContext; } 
        }

        public CategoriesRepository(MiniImageDataContext context) 
            : base(context)
        {
        }

        public async Task<IEnumerable<Category>> GetAllCatsAsync()
        {
            return await MiniImageDataContext.Categories
                .ToListAsync();
        }

        public async Task<Category> GetCatByIdAsync(int id)
        {
            return await MiniImageDataContext.Categories
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
