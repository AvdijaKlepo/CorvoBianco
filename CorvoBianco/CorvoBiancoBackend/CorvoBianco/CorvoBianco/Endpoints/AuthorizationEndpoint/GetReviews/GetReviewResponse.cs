using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetReviews
{
	public class GetReviewResponse
	{
		public List<GetReviewResponseModel> Reviews { get; set; }
	}

	public class GetReviewResponseModel
	{
		public int Id { get; set; }
		public string UserName { get; set; }
		public string UserLastName { get; set; }
		public float Rating { get; set; }
		public string Review { get; set; }
		public User User { get; set; }
		public Book Book { get; set; }
		public string BookSeries { get; set; }
		public string AuthorName { get; set; }

	}
}
