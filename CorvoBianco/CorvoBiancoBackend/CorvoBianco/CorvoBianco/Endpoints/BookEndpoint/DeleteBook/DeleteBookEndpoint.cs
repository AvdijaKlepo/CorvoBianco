using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.BookEndpoint.DeleteBook
{
	public class DeleteBookEndpoint : MyBaseEndpoint<DeleteBookRequest, DeleteBookResponse>
	{
		private readonly DataContext _dataContext;

		public DeleteBookEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpDelete("DeleteBook")]
		public override async Task<DeleteBookResponse> Obradi([FromQuery] DeleteBookRequest request,
			CancellationToken cancellationToken)
		{
			var books = _dataContext.Books.Find(request.BookId);
			if (books != null)
			{
				_dataContext.Remove(books);
				await _dataContext.SaveChangesAsync(cancellationToken);

				return new DeleteBookResponse()
				{
				};
			}

			throw new Exception("No Book was found with id = " + request.BookId);
		}
	}
}
