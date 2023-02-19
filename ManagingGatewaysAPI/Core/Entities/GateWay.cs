﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class GateWay: BaseEntity
    {
        public string SerialNo { get; set; }
        public string Name { get; set; }

     
        public string IPAddress { get; set; }
        public ICollection<DevicesForGateWays> DevicesForGateWays { get; set; }
     

    }
}
