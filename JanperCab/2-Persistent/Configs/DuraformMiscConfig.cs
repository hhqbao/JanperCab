using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscConfig : IEntityTypeConfiguration<DuraformMisc>
    {
        public void Configure(EntityTypeBuilder<DuraformMisc> builder)
        {
            builder.ToTable("DuraformMiscs");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Note)
                .HasColumnType("varchar(500)");

            builder.HasOne(x => x.MiscItem)
                .WithMany(y => y.DuraformMiscs)
                .IsRequired()
                .HasForeignKey(x => x.MiscItemId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformForm)
                .WithMany(y => y.DuraformMiscs)
                .IsRequired()
                .HasForeignKey(x => x.DuraformFormId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}