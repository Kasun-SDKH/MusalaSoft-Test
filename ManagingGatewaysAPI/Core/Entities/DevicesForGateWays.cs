using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class DevicesForGateWays: BaseEntity
    {
        public int DeviceId { get; set; }
        public int GateWayId { get; set; }
    }
}
