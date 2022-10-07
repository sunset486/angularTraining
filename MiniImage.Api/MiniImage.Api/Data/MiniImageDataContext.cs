using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MiniImage.Api.Models;
using MiniImage.Api.Models.Auth;

namespace MiniImage.Api.Data
{
    public class MiniImageDataContext : IdentityDbContext<User, Role, Guid>
    {
        public MiniImageDataContext(DbContextOptions<MiniImageDataContext> options) 
            : base(options)
        { }

        public DbSet<Stuff> Stuffs { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ShoppingItem> ShoppingItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
