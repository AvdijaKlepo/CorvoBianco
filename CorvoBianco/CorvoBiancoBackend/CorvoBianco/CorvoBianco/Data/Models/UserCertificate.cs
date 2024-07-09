using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CorvoBianco.Data.Models
{
	public abstract class UserCertificate
	{
		[Key] public int Id { get; set; }
		public string Username { get; set; }
		[JsonIgnore] public string Password { get; set; }
	

		[JsonIgnore] public User? User => this as User;
		[JsonIgnore] public Admin? Admin => this as Admin;
		public bool isAdmin => Admin != null;
		public bool isUser => User != null;
		public bool IsTwoFactorActive { get; set; }
	}
}
