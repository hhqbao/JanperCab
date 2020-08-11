using _1_Domain;
using _2_Persistent.ValueGenerators;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformQuoteConfig : IEntityTypeConfiguration<DuraformQuote>
    {
        public void Configure(EntityTypeBuilder<DuraformQuote> builder)
        {
            builder.Property(x => x.QuoteNumber)
                .HasValueGenerator<QuoteNumberGenerator>();

            builder.Property(x => x.QuoteStatus);

            builder.Property(x => x.TotalPrice)
                .HasColumnType("decimal(18,2)");
        }
    }
}