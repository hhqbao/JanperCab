using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformWrapColorConfig : IEntityTypeConfiguration<DuraformWrapColor>
    {
        public void Configure(EntityTypeBuilder<DuraformWrapColor> builder)
        {
            builder.ToTable("DuraformWrapColors");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformWrapColors)
                .IsRequired()
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}