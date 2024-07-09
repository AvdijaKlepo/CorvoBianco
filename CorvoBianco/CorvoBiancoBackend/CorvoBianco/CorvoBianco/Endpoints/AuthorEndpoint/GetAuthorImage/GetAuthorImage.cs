using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace CorvoBianco.Endpoints.AuthorEndpoint.GetAuthorImage
{
	public class GetAuthorImage:ControllerBase
	{
		[HttpGet("GetAuthorImage")]
		public async Task<FileContentResult> GetById(int id, CancellationToken cancellationToken)
		{
			var folderPath = "AuthorImages";

			byte[] bookCover;
			try
			{
				var fileName = $"{folderPath}/AuthorId{id}.jpg";
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
