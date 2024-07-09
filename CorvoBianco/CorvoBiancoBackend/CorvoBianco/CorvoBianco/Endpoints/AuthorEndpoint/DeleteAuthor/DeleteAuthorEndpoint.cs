using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.AuthorEndpoint.DeleteAuthor
{
	[Route("Author")]
	public class DeleteAuthorEndpoint : MyBaseEndpoint<DeleteAuthorRequest, DeleteAuthorResponse>
	{
		private readonly DataContext _dataContext;

		public DeleteAuthorEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpDelete("DeleteAuthor")]
		public override async Task<DeleteAuthorResponse> Obradi([FromQuery] DeleteAuthorRequest request,
			CancellationToken cancellationToken)
		{
			var authors = await _dataContext.Authors.FindAsync(request.AuthorId);
			if (authors != null)
			{
				_dataContext.Remove(authors);
				await _dataContext.SaveChangesAsync(cancellationToken);

				return new DeleteAuthorResponse()
				{

				};
			}

			throw new Exception("No Author was found with id: " + request.AuthorId);
		}
	}
}
