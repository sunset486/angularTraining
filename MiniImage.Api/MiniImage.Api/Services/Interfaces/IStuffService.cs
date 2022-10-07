using MiniImage.Api.Models;

namespace MiniImage.Api.Services.Interfaces
{
    public interface IStuffService
    {
        Task<IEnumerable<Stuff>> GetAllStuffs();
        Task<Stuff> GetStuffById(int id);
        Task<Stuff> AddNewStuff(Stuff stuff);
        Task UpdateStuff(Stuff oldStuff, Stuff newStuff);
        Task DeleteStuff(Stuff stuff);
    }
}
