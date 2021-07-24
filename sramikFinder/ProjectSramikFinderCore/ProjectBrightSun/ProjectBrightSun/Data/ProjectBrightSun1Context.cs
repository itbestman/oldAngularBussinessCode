using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProjectBrightSun.Models;

namespace ProjectBrightSun.Data
{
    public class ProjectBrightSun1Context : DbContext
    {
        public ProjectBrightSun1Context (DbContextOptions<ProjectBrightSun1Context> options)
            : base(options)
        {
        }

        public DbSet<ProjectBrightSun.Models.Employees> Employees { get; set; }
    }
}
