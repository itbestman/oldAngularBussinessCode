using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace MammacookedWebAPi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        protected void Application_BeginRequest()
        {
            if (!Response.Headers.AllKeys.Contains("Origin")&& Request.RawUrl == "/token")
            {
                Response.Headers.Add("Access-Control-Allow-Origin", "*");
            }
        }

        protected void Application_PreSendRequestContent()
        {
            //if (!Response.Headers.AllKeys.Contains("Origin") )
            //{
            //    Response.Headers.Add("Access-Control-Allow-Origin", "*");
            //}
        }
    }
}
