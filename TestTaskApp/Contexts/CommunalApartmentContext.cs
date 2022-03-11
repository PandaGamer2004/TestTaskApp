using Microsoft.EntityFrameworkCore;
using TestTaskApp.Models;

namespace TestTaskApp.Contexts
{
    public class CommunalApartmentContext : DbContext
    {

        public DbSet<СommunalApartmentPay> CommunalApartmentPays { get; set; }
        public CommunalApartmentContext(DbContextOptions<CommunalApartmentContext> options) : base(options)
        {
          
        }

                        
    }
}
