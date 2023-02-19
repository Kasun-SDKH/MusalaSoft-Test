using AutoMapper;
using Core.Entities;
using ManagingGatewaysAPI.Dto;

namespace ManagingGatewaysAPI.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GateWay, GateWaysToReturnDto>().ForMember(d => d.DevicesForGateWays, o=> o.MapFrom(s => s.DevicesForGateWays));
            CreateMap<GateWay, GateWaysDto>().ForMember(d => d.DevicesForGateWays, o=> o.MapFrom(s => s.DevicesForGateWays)).ReverseMap();
            CreateMap<GateWay, GateWaysUpdateDto>().ForMember(d => d.DevicesForGateWays, o=> o.MapFrom(s => s.DevicesForGateWays)).ReverseMap();
            CreateMap<PeripheralDevice, PeripheralDeviceDto>().ReverseMap(); 
        }
    }
}
