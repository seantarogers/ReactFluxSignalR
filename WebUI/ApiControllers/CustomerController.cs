namespace WebUI.ApiControllers
{
    using System;
    using System.Collections.Generic;
    using System.Web.Http;

    using WebUI.Dto;

    [RoutePrefix("api/customer")]
    public class CustomerController : ApiController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            var policies = GetPoliciesFromDatabase();
            var customer = new CustomerDto { CustomerName = "sean", Policies = policies };

            return this.Ok(customer);
        }

        private static List<PolicyDto> GetPoliciesFromDatabase()
        {
            var policy1 = new PolicyDto {
                                  EndDate = new DateTime(2015, 10, 10),
                                  Id = 1,
                                  Insurer = "Insurer1",
                                  Premium = 500,
                                  Type = "PolicyType1"
                              };
            var policy2 = new PolicyDto {
                                  EndDate = new DateTime(2015, 10, 10),
                                  Id = 2,
                                  Insurer = "Insurer2",
                                  Premium = 600,
                                  Type = "PolicyType2"
                              };
            var policy3 = new PolicyDto {
                                  EndDate = new DateTime(2015, 10, 10),
                                  Id = 3,
                                  Insurer = "Insurer3",
                                  Premium = 700,
                                  Type = "PolicyType3"
                              };
            var policy4 = new PolicyDto {
                                  EndDate = new DateTime(2015, 10, 10),
                                  Id = 4,
                                  Insurer = "Insurer4",
                                  Premium = 800,
                                  Type = "PolicyType4"
                              };
            var policy5 = new PolicyDto {
                                  EndDate = new DateTime(2015, 10, 10),
                                  Id = 5,
                                  Insurer = "Insurer5",
                                  Premium = 900,
                                  Type = "PolicyType5"
                              };

            return new List<PolicyDto> { policy1, policy2, policy3, policy4, policy5 };
        }
    }
}