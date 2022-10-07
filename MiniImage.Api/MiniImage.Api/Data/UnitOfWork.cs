using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Repositories;
using MiniImage.Api.Repositories.Interfaces;

namespace MiniImage.Api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MiniImageDataContext _dataContext;
        private StuffRepository _stuffRepository;
        private CategoriesRepository _categoriesRepository;

        public UnitOfWork(MiniImageDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IStuffRepository Stuffs => _stuffRepository = _stuffRepository ?? new StuffRepository(_dataContext);
        public ICategoriesRepository Categories => _categoriesRepository = _categoriesRepository ?? new CategoriesRepository(_dataContext);

        public async Task<int> CommitAsync()
        {
            return await _dataContext.SaveChangesAsync();
        }

        public void Dispose()
        {
            _dataContext.Dispose();
        }
    }
}
