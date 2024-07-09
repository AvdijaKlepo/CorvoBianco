using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	[Table("Read")]
	public class Read
	{
		[Key]
		public int Id { get; set; }

		[ForeignKey(nameof(User))]
		public int? UserId { get; set; } 

		public User? User { get; set; } 

		[ForeignKey(nameof(Book))]
		public int? BookId { get; set; } 

		public Book? Book { get; set; } 
	}
}
