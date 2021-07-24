using System;
using System.Collections.Generic;

namespace ProjectBrightSun.Models
{
    public partial class Employees
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string AltPhone { get; set; }
        public string Mother { get; set; }
        public string Father { get; set; }
        public string PanNumber { get; set; }
        public string AdharNumber { get; set; }
        public string ImagePath { get; set; }
        public string DocumentBoxPath { get; set; }
        public int? TeamId { get; set; }
        public int? TrainningHours { get; set; }
        public int? Rank { get; set; }
        public string About { get; set; }
        public DateTime CreateAt { get; set; }
        public int CreateBy { get; set; }
        public DateTime? UpdateAt { get; set; }
        public int? UpeateBy { get; set; }
        public DateTime? DeleteAt { get; set; }
        public int? DeleteBy { get; set; }
        public bool? DeleteFlag { get; set; }

        public virtual Team Team { get; set; }
    }
}
