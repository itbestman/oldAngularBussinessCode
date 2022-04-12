using MammacookedWebAPi.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MammacookedWebAPi.Controllers
{
    [Authorize]
    [RoutePrefix("api/Consumer")]
    public class CustomerController : ApiController
    {
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
                        AddCD.FirstName = value["FirstName"].ToString();
                        AddCD.LastName = value["LastName"].ToString();
                        AddCD.Address = value["Address"].ToString();
                        AddCD.City = value["City"].ToString();
                        AddCD.Country = value["Country"].ToString();
                        AddCD.PostalCode = value["PostalCode"].ToString();
                        AddCD.About = value["About"].ToString();
                        AddCD.BreakFastAddr = value["BreakFastAddr"].ToString();
                        AddCD.LunchAddr = value["LunchAddr"].ToString();
                        AddCD.DinnerAddr = value["DinnerAddr"].ToString();
                        AddCD.B_LatLong = value["B_LatLong"].ToString();
                        AddCD.L_LatLong = value["L_LatLong"].ToString();
                        AddCD.D_latLong = value["D_latLong"].ToString();
                        AddCD.Phone_1 = value["Phone_1"].ToString();
                        AddCD.Phone_2 = value["Phone_2"].ToString();
                        AddCD.CreatedOn = DateTime.Now;
                        db.CustomerDetails.Add(AddCD);
                        return Ok(db.SaveChanges());
                    }
                    else
                    {
                        CD.About = value["About"].ToString();
                        CD.Address = value["Address"].ToString();
                        CD.City = value["City"].ToString();
                        CD.Country = value["Country"].ToString();
                        CD.BreakFastAddr = value["BreakFastAddr"].ToString();
                        CD.B_LatLong = value["B_LatLong"].ToString();
                        CD.LunchAddr = value["LunchAddr"].ToString();
                        CD.L_LatLong = value["L_LatLong"].ToString();
                        CD.DinnerAddr = value["DinnerAddr"].ToString();
                        CD.D_latLong = value["D_latLong"].ToString();
                        CD.FirstName = value["FirstName"].ToString();
                        CD.LastName = value["LastName"].ToString();
                        CD.PostalCode = value["PostalCode"].ToString();
                        CD.Phone_1 = value["Phone_1"].ToString();
                        CD.Phone_2 = value["Phone_2"].ToString();
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
            DateTime DatePamam = Convert.ToDateTime(value["date"].ToString());
            DateTime StartDate = new DateTime(DatePamam.Year, DatePamam.Month, 1);
            DateTime EndDate = new DateTime(DatePamam.Year, DatePamam.Month , DateTime.DaysInMonth(DatePamam.Year, DatePamam.Month));
            EndDate = EndDate.AddHours(24).AddMinutes(60).AddSeconds(60);
            try
            {
                using (DBContext db = new DBContext())
                {

                    var res = (from O in db.Orders
                               join OI in db.OrderItems on O.Id equals OI.OrderId
                               join FI in db.FoodItems on OI.ItemId equals FI.Id
                               where O.UserId == User.Identity.Name
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

    }
}
