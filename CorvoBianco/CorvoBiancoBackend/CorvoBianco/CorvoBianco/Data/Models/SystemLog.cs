using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorvoBianco.Data.Models
{
	public class SystemLog
	{
		[Key] public int Id { get; set; }
		[ForeignKey(nameof(User))] public int UserId { get; set; }
		public UserCertificate User { get; set; }
		public string? QueryPath { get; set; }
		public string? PostData { get; set; }
		public DateTime Time { get; set; }
		public string? IpAddress { get; set; }
		public string? ExceptionMessage { get; set; }
		public bool IsException { get; set; }

	}
}
