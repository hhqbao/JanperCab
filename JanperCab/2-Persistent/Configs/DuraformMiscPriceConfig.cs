using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscPriceConfig : IEntityTypeConfiguration<DuraformMiscPrice>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscPrice> builder)
        {
            builder.ToTable("DuraformMiscPrices");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Price)
                .HasColumnType("decimal(18,2)");
        }
    }
}