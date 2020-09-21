using _1_Domain;
using _3_Application.Dtos.DuraformOrder;
using AutoMapper;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class DuraformOrderDistributorNameResolver : IValueResolver<DuraformOrder, DuraformOrderForListDto, string>
    {
        public string Resolve(DuraformOrder source, DuraformOrderForListDto destination, string destMember,
            ResolutionContext context)
        {
            return source.Distributor.Name;
        }
    }
}