namespace WebUI.Dto
{
    using Newtonsoft.Json;

    public class QuoteResponseDto
    {
        [JsonProperty("apr")]
        public decimal Apr { get; set; }
        [JsonProperty("totalPayable")]
        public int TotalPayable { get; set; }
        [JsonProperty("deposit")]
        public int Deposit { get; set; }
        [JsonProperty("dayPayable")]
        public string DayPayable { get; set; }
    }
}