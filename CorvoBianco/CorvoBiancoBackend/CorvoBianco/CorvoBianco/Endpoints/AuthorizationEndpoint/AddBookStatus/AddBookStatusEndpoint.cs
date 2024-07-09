 using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookStatus
{
	public class AddBookStatusEndpoint:MyBaseEndpoint<AddBookStatusRequest,AddBookStatusResponse>
	{
		private readonly DataContext _dataContext;

		public AddBookStatusEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddBookStatus")]
		public override async Task<AddBookStatusResponse> Obradi(AddBookStatusRequest request, CancellationToken cancellationToken)
		{
			var existingStatus = await _dataContext.BookStatus
				.FirstOrDefaultAsync(bs => bs.UserId == request.UserId && bs.BookId == request.BookId, cancellationToken);

			if (existingStatus != null)
			{
				existingStatus.Status = request.Status;
			}
			else
			{
				_dataContext.BookStatus.Add(new BookStatus
				{
					UserId = request.UserId,
					BookId = request.BookId,
					Status = request.Status
				});
			}

			await _dataContext.SaveChangesAsync(cancellationToken);

			return new AddBookStatusResponse() { Success = true };
		}
	}
}
