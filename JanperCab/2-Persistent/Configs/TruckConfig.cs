using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class TruckConfig : IEntityTypeConfiguration<Truck>
    {
        public void Configure(EntityTypeBuilder<Truck> builder)
        {
            builder.ToTable("Trucks");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.PlateNumber)
                .IsRequired()
                .HasColumnType("varchar(10)");

            builder.HasIndex(x => x.PlateNumber)
                .IsUnique();
        }
    }
}