using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDoorOptionConfig : IEntityTypeConfiguration<DuraformDoorOption>
    {
        public void Configure(EntityTypeBuilder<DuraformDoorOption> builder)
        {
            builder.ToTable("DuraformDoorOptions");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");
        }
    }
}