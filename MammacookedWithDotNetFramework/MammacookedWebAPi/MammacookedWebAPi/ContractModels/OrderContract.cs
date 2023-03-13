using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MammacookedWebAPi.ContractModels
{
    public class OrderContract
    {
        public List<OrderItem> B { get; set; }
        public List<OrderItem> L { get; set; }
        public List<OrderItem> D { get; set; }
        public DateTime OrderDate { get; set; }
    }

    public class OrderItem
    {
        public int FoodId { get; set; }
        public int TotelPrice { get; set; }
        public int PricePerPice { get; set; }
        public int Count { get; set; }
        public string Currency { get; set; }
        public string CountType { get; set; }
        public string Details { get; set; }
        public string FoodItemName { get; set; }
        public string FoodtypeName { get; set; }

    }
    public class orderOnDateReturn
    { 
        public List<Order> orders { get; set; }
    }

    public partial class tblOrder
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
        public  List<OrderItem> OrderItems { get; set; }
    }
}