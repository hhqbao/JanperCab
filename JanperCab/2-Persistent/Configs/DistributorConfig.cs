using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DistributorConfig : IEntityTypeConfiguration<Distributor>
    {
        public void Configure(EntityTypeBuilder<Distributor> builder)
        {
            builder.Property(x => x.Address)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.Suburb)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.State)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.Postcode)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ContactPerson)
                .IsRequired()
                .HasColumnType("varchar(255)");


            builder.HasMany(x => x.CabinetMakers)
                .WithOne(y => y.Distributor)
                .IsRequired()
                .HasForeignKey(y => y.DistributorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}