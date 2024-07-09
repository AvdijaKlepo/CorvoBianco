using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookStatus
{
	public class GetBookStatusEndpoint:MyBaseEndpoint<GetBookStatusRequest,GetBookStatusResponseModel>
	{
		private readonly DataContext _dataContext;

		public GetBookStatusEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetBookStatus")]
		public override async Task<GetBookStatusResponseModel> Obradi([FromQuery]GetBookStatusRequest request, CancellationToken cancellationToken)
		{
			var status = await _dataContext.BookStatus
				.Where(bs => bs.UserId == request.UserId && bs.BookId == request.BookId)
				.Select(bs => new GetBookStatusResponseModel
				{
					Status = bs.Status
				})
				.FirstOrDefaultAsync(cancellationToken);

			return new GetBookStatusResponseModel { Status = status?.Status };
		}
	}
}
