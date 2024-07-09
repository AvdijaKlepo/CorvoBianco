using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUserById
{
	public class GetUserIdResponse
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? LastName { get; set; }
		public DateTime? BirthDate { get; set; }
		public string? ProfileImage { get; set; }
		public string? AdminName { get; set; }
		public string? AdminLastName { get; set; }
		public DateTime? AdminBirthDate { get; set; }
		public ICollection<UserRating> Ratings { get; set; }
	}
}
