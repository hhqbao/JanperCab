using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DeliverySheetConfig : IEntityTypeConfiguration<DeliverySheet>
    {
        public void Configure(EntityTypeBuilder<DeliverySheet> builder)
        {
            builder.ToTable("DeliverySheets");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.HasMany(x => x.ProcessDeliverings)
                .WithOne(y => y.DeliverySheet)
                .HasForeignKey(y => y.DeliverySheetId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}