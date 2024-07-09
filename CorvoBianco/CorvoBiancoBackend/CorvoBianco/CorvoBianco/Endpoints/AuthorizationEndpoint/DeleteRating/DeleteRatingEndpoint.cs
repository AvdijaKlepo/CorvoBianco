using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Endpoints.ArticleEndpoint.DeleteArticle;
using CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookRating;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.DeleteRating
{
	public class DeleteRatingEndpoint:ControllerBase
	{
		private readonly DataContext _dataContext;

		public DeleteRatingEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpDelete("{bookId}/DeleteRating/{userId}")]
		public async Task<IActionResult> DeleteRating(int bookId, int userId)
		{
			var book = await _dataContext.Books.Include(b => b.UserRatings).FirstOrDefaultAsync(b => b.Id == bookId);
			if (book == null)
			{
				return NotFound("Book not found");
			}

			var rating = book.UserRatings.FirstOrDefault(ur => ur.UserId == userId);
			if (rating == null)
			{
				return NotFound("Rating not found");
			}

			if (book.RatingCount > 1)
			{
				book.Rating = ((book.Rating * book.RatingCount) - rating.Rating) / (book.RatingCount - 1);
			}
			else
			{
				book.Rating = 0;
			}
			book.RatingCount--;

			_dataContext.UserRatings.Remove(rating);
			_dataContext.SaveChangesAsync();
			return Ok();
		}
	}
	
}

