using Core.Entities;

namespace ManagingGatewaysAPI.Dto
{
    public class GateWaysToReturnDto : BaseEntity
    {
        public string SerialNo { get; set; }
        public string Name { get; set; }
        public string IPAddress { get; set; }
        public ICollection<DevicesForGateWays> DevicesForGateWays { get; set; }
    }
}
