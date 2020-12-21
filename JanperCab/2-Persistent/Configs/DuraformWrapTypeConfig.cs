using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformWrapTypeConfig : IEntityTypeConfiguration<DuraformWrapType>
    {
        public void Configure(EntityTypeBuilder<DuraformWrapType> builder)
        {
            builder.ToTable("DuraformWrapTypes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ICB_EDGETHICK)
                .HasColumnType("decimal(18,2)");
        }
    }
}