using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using ManagingGatewaysAPI.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ManagingGatewaysAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeripheralDevicesController : ControllerBase
    {
        private readonly IGenericRepository<PeripheralDevice> _deviceRepo;
        private readonly GateWayContext _context;
        private readonly IMapper _mapper;

        public PeripheralDevicesController(
            IGenericRepository<PeripheralDevice> deviceRepo,
            GateWayContext context,
            IMapper mapper)
        {
            _deviceRepo = deviceRepo;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<PeripheralDevice>>> Get()
        {
            var devices = await _deviceRepo.GetAllAsync();

            return Ok(devices);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PeripheralDevice>> GetById(int id)
        {
            var device = await _deviceRepo.GetByIdAsync(id);
            if(device == null)
            {
                return NoContent();
            }

            return Ok(device);
        }

        [HttpPost]
        public async Task<ActionResult> AddDevice([FromBody] PeripheralDeviceDto deviceDto)
        {
            
            var mappedDevice = _mapper.Map<PeripheralDevice>(deviceDto);
            await _deviceRepo.UpdateData(mappedDevice);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateById(int id, [FromBody] PeripheralDeviceDto deviceDto)
        {
            var device = await _context.PeripheralDevice.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);

            if (device == null)
            {
                return NoContent();
            }

            var mappedDevice = _mapper.Map<PeripheralDevice>(deviceDto);
            mappedDevice.Id = id;

            await _deviceRepo.UpdateData(mappedDevice);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteById(int id)
        {
            var device = await _context.PeripheralDevice.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (device == null)
            {
                return NoContent();
            }

            await _deviceRepo.DeleteData(device);

            return Ok();
        }

    }
}
