using MiniImage.Api.Data;
using MiniImage.Api.Models;
using MiniImage.Api.Services.Interfaces;

namespace MiniImage.Api.Services
{
    public class StuffService : IStuffService
    {
        private readonly IUnitOfWork _unitOfWork;

        public StuffService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Stuff> AddNewStuff(Stuff stuff)
        {
            await _unitOfWork.Stuffs.AddAsync(stuff);
            await _unitOfWork.CommitAsync();
            return stuff;
        }

        public async Task DeleteStuff(Stuff stuff)
        {
            _unitOfWork.Stuffs.Remove(stuff);
            await _unitOfWork.CommitAsync();
        }

        public async Task<IEnumerable<Stuff>> GetAllStuffs()
        {
            return await _unitOfWork.Stuffs.GetAllWithCategoriesAsync();
        }

        public async Task<Stuff> GetStuffById(int id)
        {
            return await _unitOfWork.Stuffs.GetWithCategoriesByIdAsync(id);
        }

        public async Task UpdateStuff(Stuff oldStuff, Stuff newStuff)
        {
            _unitOfWork.Stuffs.Remove(oldStuff);
            await _unitOfWork.Stuffs.AddAsync(newStuff);
            await _unitOfWork.CommitAsync();
        }
    }
}
