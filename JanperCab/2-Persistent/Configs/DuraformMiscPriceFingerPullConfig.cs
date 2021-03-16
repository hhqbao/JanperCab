using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscPriceFingerPullConfig : IEntityTypeConfiguration<DuraformMiscPriceFingerPull>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscPriceFingerPull> builder)
        {
            builder.Property(x => x.DuraformWrapTypeId)
                .HasColumnName("DuraformWrapTypeId");

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformMiscPriceFingerPulls)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}