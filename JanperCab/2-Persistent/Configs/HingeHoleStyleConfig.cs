using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleStyleConfig : IEntityTypeConfiguration<HingeHoleStyle>
    {
        public void Configure(EntityTypeBuilder<HingeHoleStyle> builder)
        {
            builder.ToTable("HingeHoleStyles");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedNever();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(500)");

            builder.Property(x => x.DoorPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.PantryPrice)
                .HasColumnType("decimal(18,2)");
        }
    }
}