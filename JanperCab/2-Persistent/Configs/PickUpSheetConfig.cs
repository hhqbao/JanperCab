using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class PickUpSheetConfig : IEntityTypeConfiguration<PickUpSheet>
    {
        public void Configure(EntityTypeBuilder<PickUpSheet> builder)
        {
            builder.HasOne(x => x.Customer)
                .WithMany(y => y.PickUpSheets)
                .HasForeignKey(x => x.CustomerId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.ApplicationUser)
                .WithMany(y => y.PickUpSheets)
                .HasForeignKey(x => x.ApplicationUserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}