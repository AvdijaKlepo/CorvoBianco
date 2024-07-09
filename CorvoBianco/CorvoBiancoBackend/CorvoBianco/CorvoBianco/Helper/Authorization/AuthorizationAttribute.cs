using CorvoBianco.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using static CorvoBianco.Helper.Authorization.AuthorizationService;

namespace CorvoBianco.Helper.Authorization
{
	public class AuthorizationAttribute:TypeFilterAttribute
	{
		public AuthorizationAttribute() : base(typeof(MyAuthorizationAsyncActionFilter))
		{
			
		}
	}
	public class MyAuthorizationAsyncActionFilter : IAsyncActionFilter
	{
		public async Task OnActionExecutionAsync(
			ActionExecutingContext context, ActionExecutionDelegate next)
		{
			var authService = context.HttpContext.RequestServices.GetService<AuthorizationService>()!;
			var actionLogService = context.HttpContext.RequestServices.GetService<ActionLogService>()!;

			if (!authService.isLogged())
			{
				context.Result = new UnauthorizedObjectResult("niste logirani na sistem");
				return;
			}

			MyAuthInfo myAuthInfo = authService.GetAuthInfo();

			if (myAuthInfo.UserCertificate.IsTwoFactorActive && !myAuthInfo.authenticationToken.IsTwoFactorUnclocked)
			{
				context.Result = new UnauthorizedObjectResult("niste otkljucali 2f");
				return;
			}

			await next();
			await actionLogService.Create(context.HttpContext);
		}
	}
}
