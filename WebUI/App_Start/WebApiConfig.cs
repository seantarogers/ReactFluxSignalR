namespace WebUI
{
    using System.Web.Http;

    using Newtonsoft.Json;
    using Newtonsoft.Json.Serialization;

    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();

            var formatters = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatter = formatters.JsonFormatter;
            var settings = jsonFormatter.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/customer"
            );
        }
    }
}
