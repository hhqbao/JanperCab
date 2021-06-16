using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ShippingSheetConfig : IEntityTypeConfiguration<ShippingSheet>
    {
        public void Configure(EntityTypeBuilder<ShippingSheet> builder)
        {
            builder.HasOne(x => x.Driver)
                .WithMany(y => y.ShippingSheets)
                .HasForeignKey(x => x.DriverId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Truck)
                .WithMany(y => y.ShippingSheets)
                .HasForeignKey(x => x.TruckId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}