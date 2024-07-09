using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkiaSharp;
using System.Net;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookUser
{
	public class AddWantToReadEndpoint:MyBaseEndpoint<AddBookUserRequest,int>
	{
		private readonly DataContext _dataContext;

		public AddWantToReadEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("WantToRead")]
		public override async Task<int> Obradi(AddBookUserRequest request, CancellationToken cancellationToken)
		{
			var user = await _dataContext.Users
				.Include(u => u.WantToReadBooks)
				.Include(u=>u.CurrentlyReadingBooks)
				.Include(u=>u.ReadBooks)
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
		

			if (user.WantToReadBooks.Any(c => c.BookId == request.BookId))
			{
				throw new Exception("Book is already in the Want to Read list!");
			}


			var currentlyReading = user.CurrentlyReadingBooks.FirstOrDefault(c => c.BookId == request.BookId);
			if (currentlyReading != null)
			{
				user.CurrentlyReadingBooks.Remove(currentlyReading);
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
					Status = "Want to Read"
				};
				user.BookStatuses.Add(bookStatus);
			}
			else
			{
				bookStatus.Status = "Want to Read";
			}

			var wantToRead = new WantToRead()
			{
				User = user,
				Book = book
			};

			user.WantToReadBooks.Add(wantToRead);

			await _dataContext.SaveChangesAsync(cancellationToken);

			return user.Id;
		}
	}
}
