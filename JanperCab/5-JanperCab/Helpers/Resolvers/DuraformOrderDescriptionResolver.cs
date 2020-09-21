using _1_Domain;
using _3_Application.Dtos.DuraformOrder;
using AutoMapper;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class DuraformOrderDescriptionResolver : IValueResolver<DuraformOrder, DuraformOrderForListDto, string>
    {
        public string Resolve(DuraformOrder source, DuraformOrderForListDto destination, string destMember,
            ResolutionContext context)
        {
            var description = source.DuraformDesign.Name;

            description += source.IsRoutingOnly
                ? " - Route Only"
                : $" - {source.DuraformWrapType.Name} {source.DuraformWrapColor.Name}";

            description += source.HingeHoleType == null ? string.Empty : $" - {source.HingeHoleType.Name}";

            return description;
        }
    }
}