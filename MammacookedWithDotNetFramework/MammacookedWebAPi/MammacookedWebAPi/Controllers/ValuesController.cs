using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;

namespace MammacookedWebAPi.Controllers
{

    public class ValuesController : ApiController
    {
        DBContext db = new DBContext();
        // GET api/values

        public IHttpActionResult Get(string name = "not-found.png", string MTH = "image/png")
        {
            var imageUrl = "";
            if (File.Exists(System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + name)))
            {
                imageUrl = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/" + name);
            }
            else
            {
                imageUrl = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/images/not-found.png");
            }

            return Ok(ConvertImageToString(imageUrl));


            //string base64String = "";
            //using (Image image = Image.FromFile(imageUrl))
            //{
            //    using (MemoryStream m = new MemoryStream())
            //    {
            //        image.Save(m, image.RawFormat);
            //        byte[] imageBytes = m.ToArray();

            //        // Convert byte[''] to Base64 String
            //        base64String = "data:image/jpg;base64," + Convert.ToBase64String(imageBytes);

            //    }
            //}
            //return base64String;
        }

        public string ConvertImageToString(string imageUrl)
        {

            byte[] imageArray = System.IO.File.ReadAllBytes(imageUrl);
            string base64ImageRepresentation = Convert.ToBase64String(imageArray);
            return "data:image/gif;base64," + base64ImageRepresentation;

        }

        // GET api/values/5
        public string Get(int id)
        {

            return "value";
        }

        //// POST api/values
        //public HttpResponseMessage Post([FromBody]string value)
        //{
        //    var fi = db.FoodItems.ToList().Select(x => new { x.Name, x.Prise, x.Details });
        //    //var response = Request.CreateResponse(HttpStatusCode.OK, fi);
        //    var response = Request.CreateResponse(HttpStatusCode.BadRequest, "you gave a wrong address");
        //    return response;
        //}

        // POST api/values
        public IHttpActionResult Post([FromBody]string value)
        {
            var fi = db.FoodItems.ToList().Select(x => new { x.Name, x.Prise, x.Details });

            //return Content(HttpStatusCode.BadRequest,"student not found");
            return Ok(fi);
        }
        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }


    }
}
