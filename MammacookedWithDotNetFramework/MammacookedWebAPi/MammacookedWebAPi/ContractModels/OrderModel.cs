using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace MammacookedWebAPi.ContractModels
{
    public class OrderModel
    {
  
        public int Id { get; set; }
        public string UserId { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string TimeSlot { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string PaymentStatus { get; set; }
        public string PaymentMedium { get; set; }
        public string DeleveredTo { get; set; }
        public Nullable<double> PendingAmount { get; set; }
        public List<OrderItem> OrderItems { get; set; }
    }
}