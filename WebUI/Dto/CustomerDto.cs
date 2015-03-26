namespace WebUI.Dto
{
    using System.Collections.Generic;

    public class CustomerDto
    {
        public string CustomerName { get; set; }
        public List<PolicyDto> Policies { get; set; }
    }
}