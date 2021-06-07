using _1_Domain;
using _3_Application.Dtos.DeliveryRunSheet;
using _3_Application.Dtos.Enquiry;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using _3_Application.Dtos.PickUpSheet;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class EnquiriesForPickUpSheetResolver : IValueResolver<PickUpSheet, PickUpSheetForListDto, List<EnquiryForPickUpSheetDto>>
    {
        public List<EnquiryForPickUpSheetDto> Resolve(PickUpSheet source, PickUpSheetForListDto destination, List<EnquiryForPickUpSheetDto> destMember,
            ResolutionContext context)
        {
            return source.Enquiries.Select(enquiry => new EnquiryForPickUpSheetDto(enquiry)).ToList();
        }
    }
}