namespace WebUI.Dto
{
    using System;

    public class PolicyDto
    {
        public int Premium { get; set; }
        public string Insurer { get; set; }
        public string Type { get; set; }
        public DateTime EndDate { get; set; }
        public int Id { get; set; }
    }
}