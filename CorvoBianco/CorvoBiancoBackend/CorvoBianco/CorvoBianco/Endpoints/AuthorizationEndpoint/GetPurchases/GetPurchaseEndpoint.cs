using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.PurchasesEndpoint.GetPurchases
{
	public class GetPurchasesResponseModel
	{
		public int OrderId { get; set; }
		public int UserId { get; set; }
		public int BookId { get; set; }
		public PaymentInfoResponse PaymentInfo { get; set; }
		public string Title { get; set; }
		public string Author { get; set; }
		public float? Rating { get; set; }
		public string Series { get; set; }
		public string User { get; set; }
		public bool? IsPurchased { get; set; }

	}

	public class PaymentInfoResponse
	{
		public string CardholderName { get; set; }
		public string CardType { get; set; }
		public string Last4Digits { get; set; }
		public DateTime ExpirationDate { get; set; }
		public string CardToken { get; set; }
	}

	public class GetPurchasesEndpoint : MyBaseEndpoint<object, List<GetPurchasesResponseModel>>
	{
		private readonly DataContext _dataContext;

		public GetPurchasesEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpGet("GetPurchases")]
		public override async Task<List<GetPurchasesResponseModel>> Obradi([FromQuery] object request, CancellationToken cancellationToken)
		{
			var purchases = await _dataContext.Purchases
				.OrderByDescending(p => p.Id)
				.Select(p => new GetPurchasesResponseModel
				{
					OrderId = p.Id,
					UserId = p.UserId,
					BookId = p.BookId,
					Title = p.Book.Title,
					Author = p.Book.Author.FirstName+""+p.Book.Author.LastName,
					Rating = p.Book.Rating,
					Series = p.Book.Series.SeriesName,
					User= p.User.Name,
					IsPurchased = p.Book.IsPurchased,
					PaymentInfo = new PaymentInfoResponse
					{
						CardholderName = p.PaymentInfo.CardholderName,
						CardType = p.PaymentInfo.CardType,
						Last4Digits = p.PaymentInfo.Last4Digits,
						ExpirationDate = p.PaymentInfo.ExpirationDate,
						CardToken = p.PaymentInfo.CardToken
					}
				})
				.ToListAsync(cancellationToken);

			return purchases;
		}
	
	}
}