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

            builder.Property(x => x.Side)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.Top)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TopCenter)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.BottomCenter)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Bottom)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformComponentWithOptionAndHingeHole)
                .WithOne(y => y.HingeHoleOption)
                .HasForeignKey<HingeHoleOption>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}