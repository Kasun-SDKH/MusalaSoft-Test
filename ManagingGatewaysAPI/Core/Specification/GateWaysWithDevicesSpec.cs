using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specification
{
    public class GateWaysWithDevicesSpec : BaseSpecification<GateWay>
    {
        public GateWaysWithDevicesSpec()
        {
            AddInclude(x => x.DevicesForGateWays);
        }

        public GateWaysWithDevicesSpec(int id): base(x => x.Id == id)
        {
            AddInclude(x => x.DevicesForGateWays);
        }
    }
}
