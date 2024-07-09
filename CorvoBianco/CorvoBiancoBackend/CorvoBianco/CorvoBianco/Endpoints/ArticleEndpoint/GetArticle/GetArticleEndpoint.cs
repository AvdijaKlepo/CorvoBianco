using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.ArticleEndpoint.GetArticle
{
	public class GetArticleEndpoint : MyBaseEndpoint<GetArticleRequest, GetArticleResponse>

	{
		private readonly DataContext _dataContext;

		public GetArticleEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpGet("GetArticles")]
		public override async Task<GetArticleResponse> Obradi([FromQuery] GetArticleRequest request, CancellationToken cancellationToken)
		{
			var article = await _dataContext.Articles
				.OrderByDescending(a => a.Id)
				
				
				.Select(a => new GetArticleResponseModel()
				{
					Id = a.Id,
					Title = a.Title,
					ArticlePreview = a.ArticlePreview,
					Posted = a.Posted,
					ArticleDescription = a.ArticleDescription,
					ArticleImage = a.ArticleImage,
				})
				.ToListAsync(cancellationToken: cancellationToken);

			return new GetArticleResponse()
			{
				Articles = article
			};
		}
	}
}
