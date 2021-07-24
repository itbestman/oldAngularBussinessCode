using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Cors;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(MammacookedWebAPi.Startup))]

namespace MammacookedWebAPi
{
    [EnableCors("*", "*", "*")]
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
