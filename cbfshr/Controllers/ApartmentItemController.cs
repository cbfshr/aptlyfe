using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace cbfshr.Controllers
{
    public class ApartmentItemController : ApiController
    {
		private ApartmentObjectEntities db = new ApartmentObjectEntities();

        // GET api/ApartmentItem
        public IEnumerable<ApartmentItem> GetApartmentItems()
        {
            return db.ApartmentItems.AsEnumerable();
        }

        // GET api/ApartmentItem/5
        public ApartmentItem GetApartmentItem(int id)
        {
            ApartmentItem apartmentitem = db.ApartmentItems.Find(id);
            if (apartmentitem == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return apartmentitem;
        }

        // PUT api/ApartmentItem/5
        public HttpResponseMessage PutApartmentItem(int id, ApartmentItem apartmentitem)
		//public HttpResponseMessage PutApartmentItem(int id)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != apartmentitem.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(apartmentitem).State = EntityState.Modified;
			
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/ApartmentItem
        public HttpResponseMessage PostApartmentItem(ApartmentItem apartmentitem)
        {
            if (ModelState.IsValid)
            {
                db.ApartmentItems.Add(apartmentitem);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, apartmentitem);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = apartmentitem.Id }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/ApartmentItem/5
        public HttpResponseMessage DeleteApartmentItem(int id)
        {
            ApartmentItem apartmentitem = db.ApartmentItems.Find(id);
            if (apartmentitem == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.ApartmentItems.Remove(apartmentitem);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, apartmentitem);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}