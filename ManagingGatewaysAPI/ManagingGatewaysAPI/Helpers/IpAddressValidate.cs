using System.ComponentModel.DataAnnotations;
using System.Net;

namespace ManagingGatewaysAPI.Helpers
{
    public class IpAddressValidate: ValidationAttribute
{
	public override bool IsValid(object value)
    {
           
         if (value is System.Net.IPAddress)
            {
                return true;
            }
         

        return false;
    }
}
}
