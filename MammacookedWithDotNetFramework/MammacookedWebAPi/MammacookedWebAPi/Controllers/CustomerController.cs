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
                        AddCD.About = value["About"].ToString();
                        AddCD.Address = value["Address"].ToString();
                        AddCD.City = value["City"].ToString();
                        AddCD.Country = value["Country"].ToString();
                        AddCD.BreakFastAddr = value["BreakFastAddr"].ToString();
                        AddCD.B_LatLong = value["B_LatLong"].ToString();
                        AddCD.LunchAddr = value["LunchAddr"].ToString();
                        AddCD.L_LatLong = value["L_LatLong"].ToString();
                        AddCD.Dinner = value["Dinner"].ToString();
                        AddCD.D_latLong = value["D_latLong"].ToString();
                        AddCD.FirstName = value["FirstName"].ToString();
                        AddCD.LastName = value["LastName"].ToString();
                        AddCD.PostalCode = value["PostalCode"].ToString();
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
                        CD.Dinner = value["Dinner"].ToString();
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
    }
}
