using System;
using System.Linq;
using System.Threading.Tasks;
using TestTaskApp.Contexts;
using TestTaskApp.Models;

namespace TestTaskApp.Data.DataSeeding
{
    public class DataSeeder
    {
        private CommunalApartmentContext _context;

        public DataSeeder(CommunalApartmentContext context)
        {
            _context = context;
        }

        public async Task SeedData()
        {
            _context.Database.EnsureCreated();
            if (!_context.CommunalApartmentPays.Any())
            {
                var random = new Random();
                for (var i = 0; i < 120; i++)
                {
                    var now = DateTime.Now;
                    var customNow = new DateTime(now.Year, now.Month, now.Day);
                    var communalApartment = new СommunalApartmentPay()
                    {
                        Id = Guid.NewGuid(),
                        IsPaid = random.NextInt64(0, 2) == 0,
                        Description = "Some mocked description",
                        Money = random.NextInt64(0, 150) + 0.5M,
                        IncludingTaxes = random.NextInt64(0, 2) == 0,
                        RequiredDateOfPay = customNow.Add(-TimeSpan.FromDays(random.NextInt64(0, 10))),
                        ActualDateOfPay = customNow.Add(TimeSpan.FromDays(random.NextInt64(0, 10)))
                    };
                    _context.CommunalApartmentPays.Add(communalApartment);
                }

                await _context.SaveChangesAsync();
            }
        }
        
    }
}