using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Helper
{
	public class GenerateAdmin:ControllerBase
	{
		private readonly DataContext _dataContext;

		public GenerateAdmin(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet]
		public ActionResult Count()
		{
			Dictionary<string, int> data = new Dictionary<string, int>();
			data.Add("admin", _dataContext.Admins.Count());
			
			return Ok(data);
		}

		[HttpPost("GenerateAdministrator")]
		public ActionResult GenerateAdministator()
		{
			var Admin = new List<Admin>();

			Admin.Add(new Admin()
			{
				IsTwoFactorActive = false,
				Name = "Admin",
				LastName = "Admin",
				Username = "Admin",
				Password = "Admin",
				
			});
			_dataContext.AddRange(Admin);
			_dataContext.SaveChanges();
			return Count();
		}
	}
}
