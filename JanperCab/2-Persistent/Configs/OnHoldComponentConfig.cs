using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class OnHoldComponentConfig : IEntityTypeConfiguration<OnHoldComponent>
    {
        public void Configure(EntityTypeBuilder<OnHoldComponent> builder)
        {
            builder.ToTable("OnHoldComponents");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Description)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.HasOne(x => x.Process)
                .WithMany(y => y.OnHoldComponents)
                .HasForeignKey(x => x.ProcessId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}