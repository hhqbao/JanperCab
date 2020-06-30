using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleTypeConfig : IEntityTypeConfiguration<HingeHoleType>
    {
        public void Configure(EntityTypeBuilder<HingeHoleType> builder)
        {
            builder.ToTable("HingeHoleTypes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");
        }
    }
}