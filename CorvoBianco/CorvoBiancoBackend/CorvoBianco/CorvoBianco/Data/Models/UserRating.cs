using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	public class UserRating
	{
		[Key] public int Id { get; set; }

		[ForeignKey(nameof(Book))]
		public int BookId { get; set; }
		public Book Book { get; set; }

		[ForeignKey(nameof(User))]
		public int UserId { get; set; }
		public User User { get; set; }

		public float Rating { get; set; }
		public string? Review { get; set; }
	}
}
