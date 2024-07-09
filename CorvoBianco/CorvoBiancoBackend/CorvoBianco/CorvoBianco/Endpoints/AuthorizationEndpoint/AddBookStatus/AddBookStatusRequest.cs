namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookStatus
{
	public class AddBookStatusRequest
	{
		public int UserId { get; set; }
		public int BookId { get; set; }
		public string Status { get; set; }
	}
}
