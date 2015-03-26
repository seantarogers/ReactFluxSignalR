namespace WebUI.Hubs
{
    using System.Threading;

    using Microsoft.AspNet.SignalR;

    using WebUI.Dto;

    public class QuoteHub : Hub
    {
        public void GetFinanceQuote(QuoteRequestDto quoteRequestDto)
        {
            Clients.All.addMessage("Quote request received...");
            Clients.All.incrementProgress(25);
            Thread.Sleep(600);
            Clients.All.addMessage("Transforming your request into required format...");
            Clients.All.incrementProgress(25);
            Thread.Sleep(600);
            Clients.All.addMessage("Sending your request to finance provider...");
            Clients.All.incrementProgress(25);
            Thread.Sleep(600);
            Clients.All.addMessage("Received quote back from finance provider, returning it now...");
            Clients.All.incrementProgress(25);
            Thread.Sleep(600);
            Clients.All.quoteResponse(
                new QuoteResponseDto { Apr = 16.2m, TotalPayable = 500, DayPayable = "1st", Deposit = 10 });
        }        

    }
}