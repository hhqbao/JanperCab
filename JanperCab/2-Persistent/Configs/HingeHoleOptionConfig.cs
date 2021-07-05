using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleOptionConfig : IEntityTypeConfiguration<HingeHoleOption>
    {
        public void Configure(EntityTypeBuilder<HingeHoleOption> builder)
        {
            builder.ToTable("HingeHoleOptions");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedNever();

            builder.HasOne(x => x.DuraformComponentWithOptionAndHingeHole)
                .WithOne(y => y.HingeHoleOption)
                .HasForeignKey<HingeHoleOption>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.HingeStyle)
                .WithMany(y => y.HingeHoleOptions)
                .HasForeignKey(x => x.HingeHoleStyle)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}