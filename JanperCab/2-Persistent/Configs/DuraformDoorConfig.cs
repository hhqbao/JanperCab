using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDoorConfig : IEntityTypeConfiguration<DuraformDoor>
    {
        public void Configure(EntityTypeBuilder<DuraformDoor> builder)
        {
            builder.HasOne(x => x.DuraformForm)
                .WithMany(y => y.DuraformDoors)
                .HasForeignKey(x => x.DuraformFormId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}