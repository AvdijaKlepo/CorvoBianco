using CorvoBianco.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.DeleteRating
{
	public class DeleteReview:ControllerBase
	{
		private readonly DataContext _dataContext;

		public DeleteReview(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpDelete("{bookId}/DeleteReview/{userId}")]
		public async Task<IActionResult> DeleteRevieew(int bookId, int userId)
		{
			var review = await _dataContext.UserRatings.FirstOrDefaultAsync(r => r.UserId == userId && r.BookId == bookId);
			if (review == null)
			{
				return NotFound("Review not found");
			}

			review.Review = null;

			try
			{
				await _dataContext.SaveChangesAsync();
				return Ok();
			}
			catch (DbUpdateException ex)
			{
				return BadRequest($"An error occurred while saving changes: {ex.InnerException?.Message}");
			}
		}
	}
}
