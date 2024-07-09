using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookStatus
{
	public class DeleteBookStatus:MyBaseEndpoint<AddBookStatusRequest,AddBookStatusResponse>
	{
		private readonly DataContext _dataContext;

		public DeleteBookStatus(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpDelete("DeleteStatus")]
		public override async Task<AddBookStatusResponse> Obradi(AddBookStatusRequest request, CancellationToken cancellationToken)
		{
			var existingStatus = await _dataContext.BookStatus
				.FirstOrDefaultAsync(bs => bs.UserId == request.UserId && bs.BookId == request.BookId, cancellationToken);

			if (existingStatus == null)
			{
				return new AddBookStatusResponse() { Success = false };
			}

			_dataContext.BookStatus.Remove(existingStatus);

			var wantToReadEntry = await _dataContext.Set<WantToRead>()
				.FirstOrDefaultAsync(wtr => wtr.UserId == request.UserId && wtr.BookId == request.BookId, cancellationToken);

			if (wantToReadEntry != null)
			{
				_dataContext.Set<WantToRead>().Remove(wantToReadEntry);
			}

			var currentlyReadingEntry = await _dataContext.Set<CurrentlyReading>()
				.FirstOrDefaultAsync(cr => cr.UserId == request.UserId && cr.BookId == request.BookId, cancellationToken);

			if (currentlyReadingEntry != null)
			{
				_dataContext.Set<CurrentlyReading>().Remove(currentlyReadingEntry);
			}

			var readEntry = await _dataContext.Set<Read>()
				.FirstOrDefaultAsync(r => r.UserId == request.UserId && r.BookId == request.BookId, cancellationToken);

			if (readEntry != null)
			{
				_dataContext.Set<Read>().Remove(readEntry);
			}

			await _dataContext.SaveChangesAsync(cancellationToken);

			return new AddBookStatusResponse() { Success = true };
		}
	}
}
