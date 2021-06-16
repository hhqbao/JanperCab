using _1_Domain;
using _3_Application.Dtos.DeliverySheet;
using _3_Application.Dtos.Enquiry;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class EnquiriesForSheetResolver : IValueResolver<DeliverySheet, DeliverySheetDto, List<EnquiryForSheetDto>>
    {
        public List<EnquiryForSheetDto> Resolve(DeliverySheet source, DeliverySheetDto destination, List<EnquiryForSheetDto> destMember, ResolutionContext context)
        {
            var enquiries = source.ProcessDeliverings.Select(x => x.Enquiry).ToList();

            return enquiries.Select(x => new EnquiryForSheetDto(x)).ToList();
        }
    }
}