using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionTypeConfig : IEntityTypeConfiguration<DuraformOptionType>
    {
        public void Configure(EntityTypeBuilder<DuraformOptionType> builder)
        {
            builder.ToTable("DuraformOptionTypes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");
        }
    }
}