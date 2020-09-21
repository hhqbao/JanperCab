using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOrderConfig : IEntityTypeConfiguration<DuraformOrder>
    {
        public void Configure(EntityTypeBuilder<DuraformOrder> builder)
        {
            builder.Property(x => x.OrderNumber)
                .ValueGeneratedNever();
        }
    }
}