using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MammacookedWebAPi.Models
{
    public class itemsGroupDOM
    {
        public int Id { get; set; }
        public Nullable<int> GroupId { get; set; }
        public Nullable<int> ItemId { get; set; }

        public virtual FoodGroup FoodGroup { get; set; }
        public virtual FoodItem FoodItem { get; set; }
    }
}