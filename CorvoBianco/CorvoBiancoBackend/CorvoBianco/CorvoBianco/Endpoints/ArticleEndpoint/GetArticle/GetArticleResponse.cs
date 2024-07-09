using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.ArticleEndpoint.GetArticle
{
	public class GetArticleResponse
	{
		public List<GetArticleResponseModel> Articles { get; set; }
	}
}
public class GetArticleResponseModel
{
	public int Id { get; set; }
	public string Title { get; set; }
	public string ArticlePreview { get; set; }
	public DateTime Posted { get; set; }
	public string ArticleImage { get; set; }
	public string ArticleDescription { get; set; }
	public string GenreName { get; set; }
	public ICollection<Book> Books { get; set; }

}
