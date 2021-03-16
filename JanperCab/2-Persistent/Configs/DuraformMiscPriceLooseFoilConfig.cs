using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscPriceLooseFoilConfig : IEntityTypeConfiguration<DuraformMiscPriceLooseFoil>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscPriceLooseFoil> builder)
        {
            builder.Property(x => x.DuraformWrapTypeId)
                .HasColumnName("DuraformWrapTypeId");

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformMiscPriceLooseFoils)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}