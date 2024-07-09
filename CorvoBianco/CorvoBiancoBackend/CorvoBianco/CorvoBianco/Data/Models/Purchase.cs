using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	public class Purchase
	{
		[Key] public int Id { get; set; }
		public int UserId { get; set; }
		[ForeignKey(nameof(UserId))] public User User { get; set; }
		public int BookId { get; set; }
		[ForeignKey(nameof(BookId))] public Book Book { get; set; }
		public DateTime PurchaseDate { get; set; } = DateTime.Now;
		public int PaymentInfoId { get; set; }
		[ForeignKey(nameof(PaymentInfoId))] public PurchaseInfo PaymentInfo { get; set; }
	}
}
