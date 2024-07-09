namespace CorvoBianco.Endpoints.ArticleEndpoint.AddArticle
{
	public class AddArticleRequest
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string? Preview { get; set; }
		public DateTime Posted { get; set; }
		public string? ArticleImage { get; set; }
		public string ArticleDescription { get; set; }
		public List<int> BookIds { get; set; } = new List<int>();
	}
}
