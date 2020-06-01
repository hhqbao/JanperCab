using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformSerieConfig : IEntityTypeConfiguration<DuraformSerie>
    {
        public void Configure(EntityTypeBuilder<DuraformSerie> builder)
        {
            builder.ToTable("DuraformSeries");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");
        }
    }
}