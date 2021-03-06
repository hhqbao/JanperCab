﻿using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformFileConfig : IEntityTypeConfiguration<DuraformFile>
    {
        public void Configure(EntityTypeBuilder<DuraformFile> builder)
        {
            builder.Property(x => x.Description)
                .HasColumnType("varchar(1000)");

            builder.HasOne(x => x.DuraformEnquiry)
                .WithMany(y => y.DuraformFiles)
                .HasForeignKey(x => x.DuraformEnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}