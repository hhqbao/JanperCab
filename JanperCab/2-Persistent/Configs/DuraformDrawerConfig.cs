using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDrawerConfig : IEntityTypeConfiguration<DuraformDrawer>
    {
        public void Configure(EntityTypeBuilder<DuraformDrawer> builder)
        {
            builder.Property(x => x.DrawerGap)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DrawerOne)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DrawerTwo)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DrawerThree)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DrawerFour)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DrawerFive)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformDrawerType)
                .WithMany(y => y.DuraformDrawers)
                .HasForeignKey(x => x.DuraformDrawerTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}