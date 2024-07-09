using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	[Table("Author")]
	public class Author
	{
		[Key]
		public int Id { get; set; }

		public string FirstName { get; set; } = null!;
		public string LastName { get; set; } = null!;
		public DateTime Born { get; set; }
		public string Bio { get; set; }
		public string? ProfilePicture { get; set; }
		[InverseProperty(nameof(Book.Author))]
		public ICollection<Book>? Books { get; set; } = null!;

		public ICollection<Series>? Series { get; set; } = null!;
	}
}
