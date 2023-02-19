using Core.Entities;
using ManagingGatewaysAPI.Helpers;

namespace ManagingGatewaysAPI.Dto
{
    public class GateWaysDto
    {
        public string SerialNo { get; set; }
        public string Name { get; set; }

        [IpAddressValidate]
        public string IPAddress { get; set; }
        public ICollection<DevicesForGateWays> DevicesForGateWays { get; set; }
    }
}
