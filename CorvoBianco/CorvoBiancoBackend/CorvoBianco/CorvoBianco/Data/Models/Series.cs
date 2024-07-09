using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	public class Series
	{
		[Key]
		public int Id { get; set; }

		public string SeriesName { get; set; }
		[InverseProperty(nameof(Book.Series))]
		public ICollection<Book>? Books { get; set; }
		[ForeignKey(nameof(Author))]
		public int AuthorId { get; set; }

		public Author? Author { get; set; }

	}
}
