using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PeripheralDeviceConfig : IEntityTypeConfiguration<PeripheralDevice>
    {
        public void Configure(EntityTypeBuilder<PeripheralDevice> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Vendor).HasMaxLength(50);
            builder.Property(x => x.Date).HasMaxLength(50);
          
        }
    }
}
