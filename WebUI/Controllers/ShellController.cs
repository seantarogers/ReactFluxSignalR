namespace WebUI.Controllers
{
    using System.Web.Mvc;

    [RoutePrefix("")]
    public class ShellController : Controller
    {
        [Route("")]
        [Route("GetQuotes")]
        [HttpGet]
        public ViewResult Get()
        {
            return this.View();
        }
      }
}