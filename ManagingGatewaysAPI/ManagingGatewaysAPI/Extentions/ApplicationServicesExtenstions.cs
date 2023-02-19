using Core.Interfaces;
using Infrastructure.Repository;
using ManagingGatewaysAPI.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ManagingGatewaysAPI.Extentions
{
    public static class ApplicationServicesExtenstions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
           
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddHttpContextAccessor();

            return services;
        }
    }
}
