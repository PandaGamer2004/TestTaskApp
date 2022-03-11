using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace TestTaskApp.Models
{
    public class СommunalApartmentPay
    {
        [Key]
        public Guid Id { get; set; }
        public Boolean IsPaid { get; set; }
        public Boolean IncludingTaxes { get; set; }

        [MaxLength(150)]
        public String Description { get; set; }

        [Precision(14, 2)]
        public Decimal Money { get; set; }
        public DateTime RequiredDateOfPay { get; set; }
        public DateTime ActualDateOfPay { get; set; }
    }
}
