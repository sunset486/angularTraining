namespace MiniImage.Api.Models.Responses
{
    public class AuthResponse
    {
        public bool isUserAuthenticated { get; set; }
        public string? Username { get; set; }
        public string? Token { get; set; }
    }
}
