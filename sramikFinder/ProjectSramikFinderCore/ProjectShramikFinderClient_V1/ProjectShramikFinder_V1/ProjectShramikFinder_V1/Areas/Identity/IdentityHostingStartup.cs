using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ProjectShramikFinder_V1.Data;
using ProjectShramikFinder_V1.Models;

[assembly: HostingStartup(typeof(ProjectShramikFinder_V1.Areas.Identity.IdentityHostingStartup))]
namespace ProjectShramikFinder_V1.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}