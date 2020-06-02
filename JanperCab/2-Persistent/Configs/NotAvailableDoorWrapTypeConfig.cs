using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class NotAvailableDoorWrapTypeConfig : IEntityTypeConfiguration<NotAvailableDoorWrapType>
    {
        public void Configure(EntityTypeBuilder<NotAvailableDoorWrapType> builder)
        {
            builder.ToTable("NotAvailableDoorWrapTypes");

            builder.HasKey(x => new { x.DuraformDoorId, x.DuraformWrapTypeId });

            builder.HasOne(x => x.DuraformDoor)
                .WithMany(y => y.NotAvailableDoorWrapTypes)
                .HasForeignKey(x => x.DuraformDoorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.NotAvailableDoorWrapTypes)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}