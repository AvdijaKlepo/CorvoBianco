using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.ArticleEndpoint.DeleteArticle
{
	public class DeleteArticleEndpoint : MyBaseEndpoint<DeleteArticleRequest, DeleteArticleResponse>
	{
		private readonly DataContext _dataContext;

		public DeleteArticleEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpDelete("DeleteArticle")]
		public override async Task<DeleteArticleResponse> Obradi([FromQuery] DeleteArticleRequest request, CancellationToken cancellationToken)
		{
			var article = await _dataContext.Articles.FindAsync(request.ArticleId);
			if (article != null)
			{
				_dataContext.Remove(article);
				await _dataContext.SaveChangesAsync(cancellationToken);

				return new DeleteArticleResponse()
				{

				};
			}

			throw new Exception("No Article was found with id: " + request.ArticleId);
		}
	}
}
