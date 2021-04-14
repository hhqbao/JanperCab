using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DeliveryRunSheetConfig : IEntityTypeConfiguration<DeliveryRunSheet>
    {
        public void Configure(EntityTypeBuilder<DeliveryRunSheet> builder)
        {
            builder.ToTable("DeliveryRunSheets");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(x => x.Driver)
                .WithMany(y => y.DeliveryRunSheets)
                .HasForeignKey(x => x.DriverId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}