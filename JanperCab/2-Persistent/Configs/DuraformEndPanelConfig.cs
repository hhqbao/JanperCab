using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformEndPanelConfig : IEntityTypeConfiguration<DuraformEndPanel>
    {
        public void Configure(EntityTypeBuilder<DuraformEndPanel> builder)
        {
            builder.Property(x => x.DuraformFormId)
                .HasColumnName("DuraformFormId");

            builder.Property(x => x.RailLeft)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RailCenter)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RailRight)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.ExtraRailTop)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.ExtraRailBottom)
                .HasColumnType("decimal(18,2)")
                .HasColumnName("ExtraRailBottom");

            builder.HasOne(x => x.DuraformForm)
                .WithMany(y => y.EndPanels)
                .HasForeignKey(x => x.DuraformFormId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}