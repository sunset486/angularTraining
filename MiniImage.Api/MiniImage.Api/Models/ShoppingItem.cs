using Microsoft.EntityFrameworkCore;

namespace MiniImage.Api.Models
{
    [Keyless]
    public class ShoppingItem
    {
        public string ItemName { get; set; }
        public int Qty { get; set; }
    }
}