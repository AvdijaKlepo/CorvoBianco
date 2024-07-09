using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CorvoBianco.Data.Models
{
	public class PurchaseInfo
	{
		[Key] public int Id { get; set; }
		public string CardholderName { get; set; }
		public string CardType { get; set; }
		public string Last4Digits { get; set; }
		public DateTime ExpirationDate { get; set; }
		[JsonIgnore] public string CardToken { get; set; }
	}
}
