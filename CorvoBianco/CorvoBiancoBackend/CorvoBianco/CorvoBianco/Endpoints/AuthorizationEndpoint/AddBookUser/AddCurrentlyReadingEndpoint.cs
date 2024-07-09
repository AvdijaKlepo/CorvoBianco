using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookUser
{
	public class AddCurrentlyReadingEndpoint:MyBaseEndpoint<AddBookUserRequest,int>
	{
		private readonly DataContext _dataContext;

		public AddCurrentlyReadingEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddCurrentlyReading")]
		public override async Task<int> Obradi(AddBookUserRequest request, CancellationToken cancellationToken)
		{
			var user = await _dataContext.Users
				.Include(u => u.CurrentlyReadingBooks)
				.Include(u => u.WantToReadBooks)
				.Include(u => u.ReadBooks)
				.Include(u => u.BookStatuses)
				.FirstOrDefaultAsync(u => u.Id == request.UserId, cancellationToken);

			if (user == null)
			{
				throw new Exception("User not found!");
			}

			var book = await _dataContext.Books.FindAsync(new object[] { request.BookId }, cancellationToken);
			if (book == null)
			{
				throw new Exception("Book not found!");
			}

	
			if (user.CurrentlyReadingBooks.Any(c => c.BookId == request.BookId))
			{
				throw new Exception("Book is already in the Currently Reading list!");
			}


			var wantToReadBook = user.WantToReadBooks.FirstOrDefault(w => w.BookId == request.BookId);
			if (wantToReadBook != null)
			{
				user.WantToReadBooks.Remove(wantToReadBook);
			}

		
			var readBook = user.ReadBooks.FirstOrDefault(r => r.BookId == request.BookId);
			if (readBook != null)
			{
				user.ReadBooks.Remove(readBook);
			}

		
			var bookStatus = user.BookStatuses.FirstOrDefault(s => s.BookId == request.BookId);
			if (bookStatus == null)
			{
				bookStatus = new BookStatus
				{
					UserId = user.Id,
					BookId = book.Id,
					Status = "CurrentlyReading"
				};
				user.BookStatuses.Add(bookStatus);
			}
			else
			{
				bookStatus.Status = "CurrentlyReading";
			}


			var currentlyReading = new CurrentlyReading()
			{
				User = user,
				Book = book
			};
			user.CurrentlyReadingBooks.Add(currentlyReading);

			await _dataContext.SaveChangesAsync(cancellationToken);

			return user.Id;
		}
	}
}
