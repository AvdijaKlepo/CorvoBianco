using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.BuyBook
{
	public class BuyBookEndpoint:MyBaseEndpoint<BuyBookRequest,int>
	{
		private readonly DataContext _dataContext;

		public BuyBookEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("BuyBook")]
		public override async Task<int> Obradi([FromBody]BuyBookRequest request, CancellationToken cancellationToken)
		{
			var paymentInfo = new PurchaseInfo()
			{
				CardholderName = request.PaymentInfo.CardholderName,
				CardType = request.PaymentInfo.CardType,
				Last4Digits = request.PaymentInfo.Last4Digits,
				ExpirationDate = request.PaymentInfo.ExpirationDate,
				CardToken = request.PaymentInfo.CardToken 
			};

			await _dataContext.AddAsync(paymentInfo, cancellationToken);
			await _dataContext.SaveChangesAsync(cancellationToken);

			var purchase = new Purchase()
			{
				UserId = request.UserId,
				BookId = request.BookId,
				PaymentInfoId = paymentInfo.Id
			};

			await _dataContext.AddAsync(purchase, cancellationToken);
			await _dataContext.SaveChangesAsync(cancellationToken);

			return purchase.Id;
		}
	}
}
