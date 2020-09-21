using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ApplicationFileConfig : IEntityTypeConfiguration<ApplicationFile>
    {
        public void Configure(EntityTypeBuilder<ApplicationFile> builder)
        {
            builder.ToTable("ApplicationFiles");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.FileName)
                .IsRequired();

            builder.Property(x => x.FileType)
                .IsRequired();
        }
    }
}