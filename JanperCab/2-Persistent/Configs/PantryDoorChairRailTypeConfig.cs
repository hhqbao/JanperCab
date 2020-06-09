using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class PantryDoorChairRailTypeConfig : IEntityTypeConfiguration<PantryDoorChairRailType>
    {
        public void Configure(EntityTypeBuilder<PantryDoorChairRailType> builder)
        {
            builder.ToTable("PantryDoorChairRailTypes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");
        }
    }
}