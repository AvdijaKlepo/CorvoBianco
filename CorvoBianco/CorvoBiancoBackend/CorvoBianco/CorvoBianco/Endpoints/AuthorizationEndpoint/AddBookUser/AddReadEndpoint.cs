using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookUser
{
	public class AddReadEndpoint:MyBaseEndpoint<AddBookUserRequest,int>
	{
		private readonly DataContext _dataContext;

		public AddReadEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddRead")]
		public override async Task<int> Obradi(AddBookUserRequest request, CancellationToken cancellationToken)
		{
			var user = await _dataContext.Users
				.Include(u => u.ReadBooks)
				.Include(u=>u.WantToReadBooks)
				.Include(u=>u.CurrentlyReadingBooks)
				.Include(u=>u.BookStatuses)
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
	
			if (user.ReadBooks.Any(c => c.BookId == request.BookId))
			{
				throw new Exception("Book is already in the Read list!");
			}
		

			var wantToReadBook = user.WantToReadBooks.FirstOrDefault(w => w.BookId == request.BookId);
			if (wantToReadBook != null)
			{
				user.WantToReadBooks.Remove(wantToReadBook);
			}

			var currentlyReading = user.CurrentlyReadingBooks.FirstOrDefault(c => c.BookId == request.BookId);
			if (currentlyReading != null)
			{
				user.CurrentlyReadingBooks.Remove(currentlyReading);
			}
			var bookStatus = user.BookStatuses.FirstOrDefault(s => s.BookId == request.BookId);
			if (bookStatus == null)
			{
				bookStatus = new BookStatus
				{
					UserId = user.Id,
					BookId = book.Id,
					Status = "Read"
				};
				user.BookStatuses.Add(bookStatus);
			}
			else
			{
				bookStatus.Status = "Read";
			}

			var read = new Read()
			{
				User = user,
				Book = book
			};

			user.ReadBooks.Add(read);

			await _dataContext.SaveChangesAsync(cancellationToken);

			return user.Id;
		}
	}
}
