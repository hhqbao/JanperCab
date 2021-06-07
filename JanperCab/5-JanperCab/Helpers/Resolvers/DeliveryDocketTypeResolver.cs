using System;
using _1_Domain;
using _3_Application.Dtos.DeliveryDocket;
using AutoMapper;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class DeliveryDocketTypeResolver : IValueResolver<Enquiry, DeliveryDocketDto, DeliveryDocketType>
    {
        public DeliveryDocketType Resolve(Enquiry source, DeliveryDocketDto destination, DeliveryDocketType destMember,
            ResolutionContext context)
        {
            return source switch
            {
                DuraformEnquiry _ => DeliveryDocketType.Duraform,
                _ => throw new NotImplementedException("Order Type Not Supported")
            };
        }
    }
}