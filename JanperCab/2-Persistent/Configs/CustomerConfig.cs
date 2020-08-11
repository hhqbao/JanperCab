using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CustomerConfig : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("Customers");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .HasColumnType("varchar(MAX)");

            builder.Property(x => x.Email)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.Phone)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.HasMany(x => x.ApplicationUsers)
                .WithOne(y => y.Customer)
                .IsRequired()
                .HasForeignKey(y => y.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}