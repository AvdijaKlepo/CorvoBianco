namespace CorvoBianco.Endpoints.AuthorizationEndpoint.BuyBook
{
	public class BuyBookRequest
	{
		public int UserId { get; set; }
		public int BookId { get; set; }
		public PaymentInfoRequest PaymentInfo { get; set; }
	}

	public class PaymentInfoRequest
	{
		public string CardholderName { get; set; }
		public string CardType { get; set; }
		public string Last4Digits { get; set; }
		public DateTime ExpirationDate { get; set; }
		public string CardToken { get; set; } 
	}
}
