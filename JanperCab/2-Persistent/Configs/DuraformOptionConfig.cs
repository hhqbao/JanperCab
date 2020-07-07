using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionConfig : IEntityTypeConfiguration<DuraformOption>
    {
        public void Configure(EntityTypeBuilder<DuraformOption> builder)
        {
            builder.ToTable("DuraformOptions");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedNever();

            builder.HasOne(x => x.DuraformOptionType)
                .WithMany(y => y.DuraformOptions)
                .HasForeignKey(x => x.DuraformOptionTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformComponentWithOption)
                .WithOne(y => y.DuraformOption)
                .HasForeignKey<DuraformOption>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}