using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookRating
{
	public class AddBookRatingEndpoint:ControllerBase
	{
		private readonly DataContext _dataContext;

		public AddBookRatingEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("{bookId}/rate")]
		public async Task<IActionResult> RateBook(int bookId, [FromBody] RateBookRequest request)
		{
			var book = await _dataContext.Books.Include(b => b.UserRatings).FirstOrDefaultAsync(b => b.Id == bookId);
			if (book == null)
			{
				return NotFound("Book not found");
			}
			var existingRating = book.UserRatings.FirstOrDefault(ur => ur.UserId == request.UserId);
			if (existingRating != null)
			{
			
				book.Rating = ((book.Rating * book.RatingCount) - existingRating.Rating + request.Rating) / book.RatingCount;
				existingRating.Rating = request.Rating;
			}
			else
			{
				
				book.Rating = ((book.Rating * book.RatingCount) + request.Rating) / (book.RatingCount + 1);
				book.RatingCount++;
				_dataContext.UserRatings.Add(new UserRating { BookId = bookId, UserId = request.UserId, Rating = request.Rating });
			}

			await _dataContext.SaveChangesAsync();

			return Ok();
		}

	}
	public class RateBookRequest
	{
		public int UserId { get; set; }
		public float Rating { get; set; }
	}
}
