using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WebUI.Startup))]

namespace WebUI
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
