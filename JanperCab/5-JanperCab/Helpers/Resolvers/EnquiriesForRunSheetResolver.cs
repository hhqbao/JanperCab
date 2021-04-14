using _1_Domain;
using _3_Application.Dtos.DeliveryRunSheet;
using _3_Application.Dtos.Enquiry;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class EnquiriesForRunSheetResolver : IValueResolver<DeliveryRunSheet, DeliveryRunSheetForListDto, List<EnquiryForRunSheetDto>>
    {
        public List<EnquiryForRunSheetDto> Resolve(DeliveryRunSheet source, DeliveryRunSheetForListDto destination, List<EnquiryForRunSheetDto> destMember,
            ResolutionContext context)
        {
            return source.Enquiries.Select(enquiry => new EnquiryForRunSheetDto(enquiry)).ToList();
        }
    }
}