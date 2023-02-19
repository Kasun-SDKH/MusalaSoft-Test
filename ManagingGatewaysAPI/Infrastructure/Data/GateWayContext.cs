using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class GateWayContext : DbContext
    {
        public GateWayContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<GateWay> GateWay { get; set; }
        public DbSet<PeripheralDevice> PeripheralDevice { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
