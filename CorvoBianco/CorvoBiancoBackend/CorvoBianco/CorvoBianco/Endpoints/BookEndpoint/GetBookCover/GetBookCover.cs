using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CorvoBianco.Endpoints.BookEndpoint.GetBookCover
{
	[ApiController]
	public class GetBookCoverEndpoint : ControllerBase
	{
		[HttpGet("BookCover")]
		public async Task<FileContentResult> GetById(int id, CancellationToken cancellationToken)
		{
			var folderPath = "BookCovers";

			byte[] bookCover;
			try
			{
				var fileName = $"{folderPath}/BookId{id}.jpg";
				bookCover = await System.IO.File.ReadAllBytesAsync(fileName, cancellationToken);
				return File(bookCover, GetMimeType(fileName));
			}
			catch (Exception e)
			{
				var fileName = $"{Config.NoCoverImage}";
				bookCover = await System.IO.File.ReadAllBytesAsync(fileName, cancellationToken);
				return File(bookCover, GetMimeType(fileName));
			}
		}

		static string GetMimeType(string fileName)
		{
			var provider = new FileExtensionContentTypeProvider();
			if (provider.TryGetContentType(fileName, out var contentType))
			{
				return contentType;
			}

			return "application/octet-stream";
		}
	}
}
