using CorvoBianco.Endpoints.AuthorizationEndpoint.BuyBook;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetPurchases
{
	public class GetPurchasesResponse
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
