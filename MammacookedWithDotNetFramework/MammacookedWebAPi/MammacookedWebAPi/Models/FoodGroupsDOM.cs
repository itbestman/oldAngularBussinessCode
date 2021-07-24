using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MammacookedWebAPi.Models
{
    public class FoodGroupsDOM
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
        public string GroupDetails { get; set; }
        public Nullable<bool> DeleteFlag { get; set; }
        public Nullable<bool> OfferFlag { get; set; }
        public string Image { get; set; }
        public virtual ICollection<itemsGroupDOM> ItemsGroups { get; set; }
    }
}