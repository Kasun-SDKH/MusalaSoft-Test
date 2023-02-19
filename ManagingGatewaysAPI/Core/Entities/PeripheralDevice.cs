using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class PeripheralDevice: BaseEntity
    {
        public int UID { get; set; }
        public string Vendor { get; set; }
        public DateTime Date { get; set; }
        public bool Status { get; set; }

    }
}
