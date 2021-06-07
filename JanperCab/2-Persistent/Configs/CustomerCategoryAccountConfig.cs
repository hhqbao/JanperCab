using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CustomerCategoryAccountConfig : IEntityTypeConfiguration<CustomerCategoryAccount>
    {
        public void Configure(EntityTypeBuilder<CustomerCategoryAccount> builder)
        {
            builder.Property(x => x.DurationInDays)
                .HasColumnName("DurationInDays");
        }
    }
}