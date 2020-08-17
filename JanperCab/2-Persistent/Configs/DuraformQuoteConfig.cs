using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformQuoteConfig : IEntityTypeConfiguration<DuraformQuote>
    {
        public void Configure(EntityTypeBuilder<DuraformQuote> builder)
        {
            builder.Property(x => x.QuoteNumber)
                .ValueGeneratedNever();
        }
    }
}