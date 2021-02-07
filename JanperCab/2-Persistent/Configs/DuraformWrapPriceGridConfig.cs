using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformWrapPriceGridConfig : IEntityTypeConfiguration<DuraformWrapPriceGrid>
    {
        public void Configure(EntityTypeBuilder<DuraformWrapPriceGrid> builder)
        {
            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformWrapPriceGrids)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}