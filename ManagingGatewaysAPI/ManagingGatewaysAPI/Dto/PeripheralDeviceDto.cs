namespace ManagingGatewaysAPI.Dto
{
    public class PeripheralDeviceDto
    {
        public int UID { get; set; }
        public string Vendor { get; set; }
        public DateTime Date { get; set; }
        public bool Status { get; set; }
    }
}
