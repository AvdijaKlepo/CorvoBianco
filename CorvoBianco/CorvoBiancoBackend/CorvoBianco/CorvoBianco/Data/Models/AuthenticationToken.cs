using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CorvoBianco.Data.Models
{
	public class AuthenticationToken
	{

		[Key] public int Id { get; set; }
		
		public string Value { get; set; }
		
		[ForeignKey(nameof(UserCertificate))] public int UserCertificateId { get; set; }
		
		public UserCertificate UserCertificate { get; set; }

		public DateTime EvidentedTime { get; set; }
	
		public string? IpAddress { get; set; }
		
		[JsonIgnore] public string? TwoFactorKey { get; set; }
		
		public bool IsTwoFactorUnclocked { get; set; }

	}
}
