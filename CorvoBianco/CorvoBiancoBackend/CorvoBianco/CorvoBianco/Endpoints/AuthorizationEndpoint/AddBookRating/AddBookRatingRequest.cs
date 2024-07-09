namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookRating
{
	public class AddBookRatingRequest
	{
		public int UserId { get; set; }
		public float Rating { get; set; }
	}
}
