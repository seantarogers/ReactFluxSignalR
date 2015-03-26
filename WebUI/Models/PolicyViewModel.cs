namespace WebUI.Models
{
    using System;

    public class PolicyViewModel
    {
        public DateTime EndDate { get; set; }
        public string Insurer { get; set; }
        public string Premium { get; set; }
        public string PolicyNumber { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
    }
}
