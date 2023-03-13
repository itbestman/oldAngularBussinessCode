using MammacookedWebAPi.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MammacookedWebAPi.ContractModels;
using MammacookedWebAPi.Enums;
using AutoMapper;

namespace MammacookedWebAPi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Consumer")]
    public class CustomerController : ApiController
    {

        IMapper iMapper;


        public CustomerController()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Order, OrderModel>();
            });

            iMapper = config.CreateMapper();
        }
        [Route("UpdateConsumer")]
        [HttpPost]
        public IHttpActionResult UpdateConsumer(JObject value)
        {
            string UserName = User.Identity.Name;
            try
            {
                using (DBContext db = new DBContext())
                {
                    CustomerDetail CD = db.CustomerDetails.Where(x => x.Email == UserName).FirstOrDefault();
                    if (CD == null)
                    {
                        CustomerDetail AddCD = new CustomerDetail();
                        AddCD.Email = User.Identity.Name;
                        AddCD.FirstName = value["firstName"].ToString();
                        AddCD.LastName = value["lastName"].ToString();
                        AddCD.Address = value["address"].ToString();
                        AddCD.City = value["city"].ToString();
                        AddCD.Country = value["country"].ToString();
                        AddCD.PostalCode = value["postalCode"].ToString();
                        AddCD.About = value["about"].ToString();
                        //AddCD.BreakFastAddr = value["BreakFastAddr"].ToString();
                        //AddCD.LunchAddr = value["LunchAddr"].ToString();
                        //AddCD.DinnerAddr = value["DinnerAddr"].ToString();
                        //AddCD.B_LatLong = value["B_LatLong"].ToString();
                        //AddCD.L_LatLong = value["L_LatLong"].ToString();
                        //AddCD.D_latLong = value["D_latLong"].ToString();  in Future will again review and provide saparet bld
                        AddCD.BreakFastAddr = value["foodDeliveryAddress"].ToString();
                        AddCD.LunchAddr = "";
                        AddCD.DinnerAddr = "";
                        AddCD.B_LatLong = value["FDALatLong"].ToString();
                        AddCD.L_LatLong = "";
                        AddCD.D_latLong = "";
                        AddCD.Phone_1 = value["phoneNumber"].ToString();
                        AddCD.Phone_2 = value["altPhoneNumber"].ToString();
                        AddCD.CreatedOn = DateTime.Now;
                        db.CustomerDetails.Add(AddCD);
                        return Ok(db.SaveChanges());
                    }
                    else
                    {
                        CD.About = value["about"].ToString();
                        CD.Address = value["address"].ToString();
                        CD.City = value["city"].ToString();
                        CD.Country = value["country"].ToString();
                        CD.BreakFastAddr = value["foodDeliveryAddress"].ToString();
                        CD.B_LatLong = value["FDALatLong"].ToString();
                        CD.LunchAddr = "";
                        CD.L_LatLong = "";
                        CD.DinnerAddr = "";
                        CD.D_latLong = "";
                        CD.FirstName = value["firstName"].ToString();
                        CD.LastName = value["lastName"].ToString();
                        CD.PostalCode = value["postalCode"].ToString();
                        CD.Phone_1 = value["phoneNumber"].ToString();
                        CD.Phone_2 = value["altPhoneNumber"].ToString();
                        CD.UpdateOn = DateTime.Now;
                        var ret = db.SaveChanges();
                        return Ok(ret);
                    }

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            //return Ok("success full");
        }

        [Route("GetConsumerDetails")]
        [HttpPost]
        public IHttpActionResult GetConsumer(JObject value)
        {
            try
            {
                using (DBContext db = new DBContext())
                {
                    CustomerDetail CD = db.CustomerDetails.Where(x => x.Email == User.Identity.Name).FirstOrDefault();
                    if (CD != null)
                    {
                        return Ok(CD);
                    }
                    else
                    {
                        return Json(new { Status = "OK", Email = User.Identity.Name });
                    }


                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }

        [Route("GetFoodPlansForMonth")]
        [HttpPost]
        public IHttpActionResult GetFoodPlansForMonth(JObject value)
        {
            DateTime DateParam = Convert.ToDateTime(value["date"].ToString());
            DateTime StartDate = new DateTime(DateParam.Year, DateParam.Month, 1);
            DateTime EndDate = new DateTime(DateParam.Year, DateParam.Month, DateTime.DaysInMonth(DateParam.Year, DateParam.Month));
            EndDate = EndDate.AddHours(24).AddMinutes(60).AddSeconds(60);
            try
            {
                using (DBContext db = new DBContext())
                {

                    var res = (from O in db.Orders
                               join OI in db.OrderItems on O.Id equals OI.OrderId
                               join FI in db.FoodItems on OI.ItemId equals FI.Id
                               where O.UserId == User.Identity.Name && O.IsDeleted == false || O.IsDeleted == null
                               && O.Date >= StartDate && O.Date < EndDate
                               orderby O.DeleveredTo
                               select new
                               {
                                   UserId = O.UserId,
                                   TimeSlot = O.TimeSlot,
                                   DeleveryDate = O.Date,
                                   DeleveryStatus = O.Status,
                                   Location = O.Location,
                                   PaymentStatus = O.PaymentStatus,
                                   PaymentMedium = O.PaymentMedium,
                                   DeleveredTo = O.DeleveredTo,
                                   PendingAmount = O.PendingAmount,
                                   FoodItemName = FI.Name,
                                   Details = FI.Details,
                                   Count = OI.Count,
                                   PricePerPice = FI.Prise,
                                   CountType = FI.CountType,
                                   TotelPrice = OI.Count * FI.Prise,
                                   Currency = FI.Currency
                               }).ToList();

                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Json(new { Status = "Error", Email = User.Identity.Name });
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetUserDashBoardData")]
        [HttpPost]
        public IHttpActionResult GetUserDashBoardData(JObject value)
        {
            string UserName = User.Identity.Name;
            try
            {
                using (DBContext db = new DBContext())
                {

                    var res = (
                                from user in db.CustomerDetails
                                where user.Email == UserName
                                select user
                               ).ToList();

                    if (res != null)
                    {
                        return Ok(res);
                    }
                    else
                    {
                        return Json(new { Status = "Error", Email = User.Identity.Name });
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("AddOrder")]
        [HttpPost]
        public IHttpActionResult AddOrder(OrderContract orders)
        {
            try
            {
                if (DateTime.Now> orders.OrderDate)
                {
                    return BadRequest("Can not update old requests");
                }
                using (DBContext db = new DBContext())
                {
                    var tempOrders = db.Orders.Where((x) => x.Date == orders.OrderDate).Select((x) => x);
                    foreach (var item in tempOrders)
                    {
                        item.IsDeleted = true;
                    }
                    db.SaveChanges();
                }

                using (DBContext db = new DBContext())
                {
                    var customer = (from user in db.CustomerDetails
                                    where user.Email == User.Identity.Name
                                    select user).FirstOrDefault();

                    List<Order> listOrder = new List<Order>();

                    if (orders.B.Count > 0 && orders.B.Where(x => x.Count > 0).ToList().Count > 0)
                    {
                        Order tblOrder = new Order();
                        tblOrder.UserId = User.Identity.Name;
                        tblOrder.TimeSlot = "B";
                        tblOrder.Status = OrderStatus.BOOKED;
                        tblOrder.PendingAmount = 0;
                        tblOrder.PaymentStatus = PaymentStatus.PENDING;
                        tblOrder.PaymentMedium = PaymentMedium.PAYMENTPENDING;
                        tblOrder.Location = customer.Address;
                        tblOrder.Date = orders.OrderDate;
                        tblOrder.DeleveredTo = customer.FirstName + " " + customer.LastName;
                        tblOrder.IsDeleted = false;
                        foreach (var orderItem in orders.B)
                        {
                            if (orderItem.Count > 0)
                            {
                                OrderItem oi = new OrderItem();
                                oi.ItemId = orderItem.FoodId;
                                oi.Count = orderItem.Count;
                                oi.DateTime = orders.OrderDate;
                                tblOrder.OrderItems.Add(oi);
                            }
                            //db.Orders.Add()
                        }
                        db.Orders.Add(tblOrder);
                        listOrder.Add(tblOrder);
                    }
                    if (orders.L.Count > 0 && orders.L.Where(x => x.Count > 0).ToList().Count > 0)
                    {
                        Order tblOrder = new Order();
                        tblOrder.UserId = User.Identity.Name;
                        tblOrder.TimeSlot = "L";
                        tblOrder.Status = OrderStatus.BOOKED;
                        tblOrder.PendingAmount = 0;
                        tblOrder.PaymentStatus = PaymentStatus.PENDING;
                        tblOrder.PaymentMedium = PaymentMedium.PAYMENTPENDING;
                        tblOrder.Location = customer.Address;
                        tblOrder.Date = orders.OrderDate;
                        tblOrder.DeleveredTo = customer.FirstName + " " + customer.LastName;
                        tblOrder.IsDeleted = false;
                        foreach (var orderItem in orders.L)
                        {
                            if (orderItem.Count > 0)
                            {
                                OrderItem oi = new OrderItem();
                                oi.ItemId = orderItem.FoodId;
                                oi.Count = orderItem.Count;
                                oi.DateTime = orders.OrderDate;
                                tblOrder.OrderItems.Add(oi);
                            }
                            //db.Orders.Add()
                        }
                        db.Orders.Add(tblOrder);
                        listOrder.Add(tblOrder);
                    }
                    if (orders.D.Count > 0 && orders.D.Where(x => x.Count > 0).ToList().Count > 0)
                    {
                        Order tblOrder = new Order();
                        tblOrder.UserId = User.Identity.Name;
                        tblOrder.TimeSlot = "D";
                        tblOrder.Status = OrderStatus.BOOKED;
                        tblOrder.PendingAmount = 0;
                        tblOrder.PaymentStatus = PaymentStatus.PENDING;
                        tblOrder.PaymentMedium = PaymentMedium.PAYMENTPENDING;
                        tblOrder.Location = customer.Address;
                        tblOrder.Date = orders.OrderDate;
                        tblOrder.DeleveredTo = customer.FirstName + " " + customer.LastName;
                        tblOrder.IsDeleted = false;
                        foreach (var orderItem in orders.D)
                        {
                            if (orderItem.Count > 0)
                            {
                                OrderItem oi = new OrderItem();
                                oi.ItemId = orderItem.FoodId;
                                oi.Count = orderItem.Count;
                                oi.DateTime = orders.OrderDate;
                                tblOrder.OrderItems.Add(oi);
                            }
                            //db.Orders.Add()
                        }
                        db.Orders.Add(tblOrder);
                        listOrder.Add(tblOrder);

                    }

                    var saveOutput = db.SaveChanges();
                    if (saveOutput != 0)
                    {
                        return Ok();
                    }
                    else
                    {
                        return Json(new { Status = "Error", Email = User.Identity.Name });
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetOrdersOfDate")]
        [HttpPost]
        public IHttpActionResult GetOrdersOfDate(JObject data)
        {
            try
            {
                DateTime orderDate = Convert.ToDateTime(data["orderDate"].ToString());
                //IQueryable<Order> orderOnDate;
                using (DBContext db = new DBContext())
                {
                    var customer = (from user in db.CustomerDetails
                                    where user.Email == User.Identity.Name
                                    select user).FirstOrDefault();

                    var ordersValues = (from O in db.Orders
                                        where O.Date == orderDate
                                        && O.UserId == customer.Email
                                        && O.OrderItems.Count > 0 
                                        && (O.IsDeleted ==false || O.IsDeleted == null)
                                        select new
                                        {
                                            orders = O.Id,
                                            O.TimeSlot,
                                            orderItem = O.OrderItems.Select(x => new { x.ItemId, x.Count })
                                        }).ToList();





                    return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(ordersValues));
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }

}


