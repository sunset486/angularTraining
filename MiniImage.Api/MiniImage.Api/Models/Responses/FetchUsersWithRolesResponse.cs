namespace MiniImage.Api.Models.Responses
{
    public class FetchUsersWithRolesResponse
    {
        public IEnumerable<string>? Users { get; set; }
        public IEnumerable<string>? UserRoles { get; set; }
    }
}
