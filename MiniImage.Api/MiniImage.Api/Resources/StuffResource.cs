using System.ComponentModel.DataAnnotations;

namespace MiniImage.Api.Resources
{
    public class StuffResource
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public float Price { get; set; }

        public string ImgSource { get; set; }
    }
}
