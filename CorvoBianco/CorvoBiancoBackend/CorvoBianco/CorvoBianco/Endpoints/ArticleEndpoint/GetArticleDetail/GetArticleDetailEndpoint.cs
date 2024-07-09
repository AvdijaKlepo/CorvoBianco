using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.ArticleEndpoint.GetArticleDetail
{
	public class GetArticleDetailEndpoint : MyBaseEndpoint<int, GetArticleDetailResponse>
	{
		private readonly DataContext _dataContext;

		public GetArticleDetailEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpGet("GetArticleDetail{id}")]
		public override async Task<GetArticleDetailResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var articleDetails = await _dataContext.Articles
				.Include(article => article.Books)
				.Select(x => new GetArticleDetailResponse()
				{
					Id = x.Id,
					Title = x.Title,
					ArticleDescription = x.ArticleDescription,
					Posted = x.Posted,
					ArticleImage = x.ArticleImage,
					ArticlePreview = x.ArticlePreview,
					Books = x.Books

				})
				.SingleAsync(x => x.Id == id, cancellationToken: cancellationToken);

			return articleDetails;
		}
	}
}
