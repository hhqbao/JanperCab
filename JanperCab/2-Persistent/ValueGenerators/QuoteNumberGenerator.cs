using _1_Domain;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System.Linq;

namespace _2_Persistent.ValueGenerators
{
    public class QuoteNumberGenerator : ValueGenerator<int>
    {
        public override bool GeneratesTemporaryValues => false;


        public override int Next(EntityEntry entry)
        {
            var dbContext = (ApplicationDbContext)entry.Context;

            var latestQuote = dbContext.DuraformForms.OfType<DuraformQuote>()
                .OrderByDescending(x => x.QuoteNumber)
                .FirstOrDefault();

            return latestQuote?.QuoteNumber + 1 ?? 1;
        }
    }
}