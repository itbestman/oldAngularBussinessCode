using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MammacookedWebAPi.Enums
{
    public static class OrderStatus
    {
        public const string DELEVERED = "Delevered";
        public const string BOOKED = "Booked";
        public const string PREPAIRING = "Prepairing";
        public const string CANCEL = "Cancel";
        public const string ONWAY = "OnWay";
    }

    public static class PaymentStatus
    {
        public const string DONE = "DONE";
        public const string PENDING = "PENDING";
    }
    public static class PaymentMedium
    {
        public const string COD = "COD";
        public const string NETBANKING = "NETBANKING";
        public const string UPI = "UPI";
        public const string PAYMENTPENDING = "PAYMENTPENDING";
    }
}