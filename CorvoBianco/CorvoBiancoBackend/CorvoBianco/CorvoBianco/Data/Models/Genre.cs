using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	[Table("Genre")]
	public class Genre
	{
		[Key]
		public int Id { get; set; }
		public string? GenreName { get; set; }
		[InverseProperty(nameof(Book.Genre))]
		public ICollection<Book>? Books { get; set; }

		
	}
}
