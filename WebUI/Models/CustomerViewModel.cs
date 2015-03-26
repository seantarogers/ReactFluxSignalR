namespace WebUI.Models
{
    using System.Collections.Generic;

    public class CustomerViewModel
    {
        public string Name { get; set; }
        public IList<PolicyViewModel> Policies { get; set; }
    }
}