using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformComponentConfig : IEntityTypeConfiguration<DuraformComponent>
    {
        public void Configure(EntityTypeBuilder<DuraformComponent> builder)
        {
            builder.ToTable("DuraformComponents");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Height)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Width)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Note)
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.Price)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformEdgeProfile)
                .WithMany(y => y.DuraformComponents)
                .IsRequired()
                .HasForeignKey(x => x.DuraformEdgeProfileId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformEnquiry)
                .WithMany(y => y.DuraformComponents)
                .HasForeignKey(x => x.DuraformEnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}