using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformPantryDoorConfig : IEntityTypeConfiguration<DuraformPantryDoor>
    {
        public void Configure(EntityTypeBuilder<DuraformPantryDoor> builder)
        {


            builder.Property(x => x.ChairRailHeight)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.ExtraRailBottom)
                .HasColumnType("decimal(18,2)")
                .HasColumnName("ExtraRailBottom");

            builder.HasOne(x => x.ChairRailType)
                .WithMany(y => y.DuraformPantryDoors)
                .HasForeignKey(x => x.ChairRailTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}