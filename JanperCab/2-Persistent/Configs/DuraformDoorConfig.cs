﻿using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDoorConfig : IEntityTypeConfiguration<DuraformDoor>
    {
        public void Configure(EntityTypeBuilder<DuraformDoor> builder)
        {
            builder.ToTable("DuraformDoors");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .HasColumnType("varchar(1000)");

            builder.HasOne(x => x.DuraformSerie)
                .WithMany(y => y.DuraformDoors)
                .HasForeignKey(x => x.DuraformSerieId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.HasOne(x => x.FixedEdgeProfile)
                .WithMany(y => y.DuraformDoorsWithFixed)
                .HasForeignKey(x => x.FixedEdgeProfileId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DefaultEdgeProfile)
                .WithMany(y => y.DuraformDoorsWithDefault)
                .HasForeignKey(x => x.DefaultEdgeProfileId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}