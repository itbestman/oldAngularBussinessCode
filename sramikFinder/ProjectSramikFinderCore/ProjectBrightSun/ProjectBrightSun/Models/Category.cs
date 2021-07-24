using System;
using System.Collections.Generic;

namespace ProjectBrightSun.Models
{
    public partial class Category
    {
        public Category()
        {
            Team = new HashSet<Team>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string About { get; set; }
        public DateTime? CreateAt { get; set; }
        public int? CreateBy { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int? UpeateBy { get; set; }
        public DateTime? DeleteAt { get; set; }
        public int? DeleteBy { get; set; }
        public bool? DeleteFlag { get; set; }

        public virtual ICollection<Team> Team { get; set; }
    }
}
