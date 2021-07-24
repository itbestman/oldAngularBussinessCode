using System;
using System.Collections.Generic;

namespace ProjectBrightSun.Models
{
    public partial class Team
    {
        public Team()
        {
            Employees = new HashSet<Employees>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public int? Rank { get; set; }
        public int? CategoryId { get; set; }
        public string About { get; set; }
        public string LeadName { get; set; }
        public string Address { get; set; }
        public DateTime? CreateAt { get; set; }
        public int? CreateBy { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int? UpeateBy { get; set; }
        public DateTime? DeleteAt { get; set; }
        public int? DeleteBy { get; set; }
        public bool? DeleteFlag { get; set; }

        public virtual Category Category { get; set; }
        public virtual ICollection<Employees> Employees { get; set; }
    }
}
