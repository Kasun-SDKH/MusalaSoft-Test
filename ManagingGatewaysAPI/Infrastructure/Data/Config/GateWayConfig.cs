using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Config
{
    public class GateWayConfig : IEntityTypeConfiguration<GateWay>
    {
        public void Configure(EntityTypeBuilder<GateWay> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(p=>p.SerialNo).HasMaxLength(100);
            builder.Property(p => p.Name).HasMaxLength(100);
            builder.Property(p => p.IPAddress).HasMaxLength(20);

        }
    }
}
