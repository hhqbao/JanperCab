using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscPriceCapMouldConfig : IEntityTypeConfiguration<DuraformMiscPriceCapMould>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscPriceCapMould> builder)
        {
            builder.Property(x => x.DuraformWrapTypeId)
                .HasColumnName("DuraformWrapTypeId");

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformMiscPriceCapMoulds)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}