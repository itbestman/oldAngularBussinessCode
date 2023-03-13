using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using MammacookedWebAPi.Models;
using Newtonsoft.Json.Linq;

namespace MammacookedWebAPi.Controllers
{
    [RoutePrefix("api/HomePage")]
    public class IndexController : ApiController
    {
        [Route("GetFoodGroup")]
        [HttpPost]
        public IHttpActionResult GetFoodGroup([FromBody]string value)
        {
            try
            {
                using (DBContext db = new DBContext())
                {
                    string host = HttpContext.Current.Request.UrlReferrer.AbsoluteUri;


                    var fg = db.FoodGroups.Where(x => x.DeleteFlag == false).Select(
                        x => new
                        {
                            x.Id,
                            x.GroupDetails,
                            x.GroupName,
                            x.Image
                            ,x.Summary
                        })
                        .ToList();


                    //Image = "data:image/gif;base64," + Convert.ToBase64String(System.IO.File.ReadAllBytes(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + x.Image)))
                    //var pm = fg.Select(x => new
                    //{
                    //    Image = "data:image/gif;base64," +
                    //            Convert.ToBase64String(System.IO.File.ReadAllBytes(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + x.Image)))

                    //});
                    List<FoodGroupsDOM> foodGroupsDOMs = new List<FoodGroupsDOM>();
                    foreach (var FG in fg.ToList())
                    {
                        FoodGroupsDOM lfg = new FoodGroupsDOM();
                        lfg.Id = FG.Id;
                        lfg.GroupDetails = FG.GroupDetails;
                        lfg.GroupName = FG.GroupName;
                        lfg.Image = ConvertImageToString(FG.Image.Trim());
                        lfg.Summary = FG.Summary;
                        foodGroupsDOMs.Add(lfg);

                    }

                    return Ok(foodGroupsDOMs);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }


            //return Ok("success full");
        }

        public static string ConvertImageToString(string name)
        {
            //fg.Select(x => new{x.Id,x.GroupDetails,x.GroupName,x.Image, theimage="manish"} );
            var imageUrl = "";

            if (File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + name)))
            {
                imageUrl = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + name);
            }
            else
            {
                imageUrl = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/not-found.png");
            }

            byte[] imageArray = System.IO.File.ReadAllBytes(imageUrl);
            string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            return "data:image/gif;base64," + base64ImageRepresentation;

        }

        [Route("GetFoodGroupItems")]
        [HttpPost]
        public IHttpActionResult GetFoodGroupItems([FromBody]string value)
        {
            try
            {
                using (DBContext db = new DBContext())
                {
                    

                    var foodItemJson = db.getFoodGroupItemJson2().ToList();
                    string retval = "";
                    foreach (string str in foodItemJson)
                    {
                        retval = retval + str;
                    }

                    var json = JArray.Parse(retval);
                    foreach (JObject root in json)
                    {
                        root["FoodGroupImage"] = ConvertImageToString(root["FoodGroupImage"].ToString().Trim());
                        foreach (JObject rootInner in root["foodItems"])
                        {
                            rootInner["Image"] = ConvertImageToString(rootInner["Image"].ToString().Trim());
                        }
                    }

                    return Ok(json);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }


            //return Ok("success full");
        }

        [Route("GetUserInformation")]
        [HttpPost]
        public IHttpActionResult GetUserInformation([FromBody]string value)
        {
            try
            {
                using (DBContext db = new DBContext())
                {
                    var foodItemJson = db.getFoodGroupItemJson().ToList();
                    return Ok(foodItemJson);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetDefaultFoodPlans")]
        [HttpPost]
        public IHttpActionResult GetDefaultFoodPlans()
        {
            try
            {
                using (DBContext db = new DBContext())
                {
                    var res = (from O in db.Orders
                              join OI in db.OrderItems on O.Id equals OI.OrderId
                              join FI in db.FoodItems on OI.ItemId equals FI.Id
                              where (O.UserId == "defalult_bf" || O.UserId == "defalult_dnr" || O.UserId == "defalult_lnc")
                                    && FI.DeleteFlag == false 
                              select new
                              {
                                  FoodtypeName = O.UserId == "defalult_bf" ? "Breack Fast" : O.UserId == "defalult_dnr" ? "Dinner" : O.UserId == "defalult_lnc" ? "Lunch" : "",
                                  FoodItemName = FI.Name,
                                  Details = FI.Details,
                                  Count = OI.Count,
                                  PricePerPice=FI.Prise,
                                  CountType=FI.CountType,
                                  TotelPrice = OI.Count * FI.Prise,
                                  Currency = FI.Currency,
                                  FoodId=FI.Id
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

        // GET: api/Index
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Index/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Index
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Index/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Index/5
        public void Delete(int id)
        {
        }
    }
}
//HttpContext.Current.Request.UrlReferrer.AbsoluteUri