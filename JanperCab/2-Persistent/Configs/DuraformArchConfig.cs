using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformArchConfig : IEntityTypeConfiguration<DuraformArch>
    {
        public void Configure(EntityTypeBuilder<DuraformArch> builder)
        {
            builder.ToTable("DuraformArches");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .IsRequired()
                .HasColumnType("varchar(1000)");
        }
    }
}