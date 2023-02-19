using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using ManagingGatewaysAPI.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ManagingGatewaysAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagingGatewayController : ControllerBase
    {
        private readonly IGenericRepository<GateWay> _gateWayRepo;
        private readonly IGenericRepository<DevicesForGateWays> _gateWayDevicesRepo;
        private readonly IGenericRepository<PeripheralDevice> _deviceRepo;
        private readonly IMapper _mapper;

        public ManagingGatewayController(IGenericRepository<GateWay> gateWayRepo, 
            IGenericRepository<DevicesForGateWays> gateWayDevicesRepo,
            IGenericRepository<PeripheralDevice> deviceRepo, 
            IMapper mapper)
        {
            _gateWayRepo = gateWayRepo;
            _gateWayDevicesRepo = gateWayDevicesRepo;
            _deviceRepo = deviceRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<GateWaysToReturnDto>>> GetGateWay()
        {
            var spec = new GateWaysWithDevicesSpec();
            var gateWays = await _gateWayRepo.ListAsync(spec);
            return Ok(_mapper.Map<IReadOnlyList<GateWay>, IReadOnlyList<GateWaysToReturnDto>>(gateWays));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GateWaysToReturnDto>> GetGateWayById(int id)
        {
            var spec = new GateWaysWithDevicesSpec(id);
            var gateWay = await _gateWayRepo.GetEntityWithSpec(spec);

            if (gateWay == null)
            {
                return NoContent();
            }

            return _mapper.Map<GateWay, GateWaysToReturnDto>(gateWay);
        }

        [HttpPost]
        public async Task<ActionResult> InsertGateWayData(GateWaysDto gateWaysSto)
        {
            if (gateWaysSto == null)
            {
                return NoContent();
            }

            var mappedRecord = _mapper.Map<GateWay>(gateWaysSto);

            await _gateWayRepo.InsertData(mappedRecord);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateGateWayData(int id, [FromBody]GateWaysDto gateWaysDto)
        {
            var spec = new GateWaysWithDevicesSpec(id);
            var gateWaysRecord = await _gateWayRepo.GetEntityWithSpec(spec);
            

            if(gateWaysRecord == null)
            {
                return NotFound();
            }

            

            foreach(var device in gateWaysRecord.DevicesForGateWays)
            {
                await _gateWayDevicesRepo.DeleteData(device);
            }

            var mappedRecord = _mapper.Map<GateWay>(gateWaysDto);
            mappedRecord.Id = id;
           
            
            

            await _gateWayRepo.UpdateData(mappedRecord);
            return Ok(gateWaysDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteGateWayData(int id)
        {
            var spec = new GateWaysWithDevicesSpec(id);
            var gateWaysRecord = await _gateWayRepo.GetEntityWithSpec(spec);

            if (gateWaysRecord == null)
            {
                return NoContent();
            }

            foreach(var dev in gateWaysRecord.DevicesForGateWays)
            {
              await  _gateWayDevicesRepo.DeleteData(dev);
            }

            await _gateWayRepo.DeleteData(gateWaysRecord);
            return Ok();
        }

    }
}
