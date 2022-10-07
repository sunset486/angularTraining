using MiniImage.Api.Repositories.Interfaces;

namespace MiniImage.Api.Data
{
    public interface IUnitOfWork
    {
        IStuffRepository Stuffs { get; }
        ICategoriesRepository Categories { get; }
        Task<int> CommitAsync();
    }
}
