using _1_Domain;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.HingeHoleOption;
using AutoMapper;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class HingeHoleOptionResolver : IValueResolver<DuraformComponentWithOptionAndHingeHoleDto, DuraformComponentWithOptionAndHingeHole, HingeHoleOption>
    {
        public HingeHoleOption Resolve(DuraformComponentWithOptionAndHingeHoleDto source,
            DuraformComponentWithOptionAndHingeHole destination, HingeHoleOption destMember, ResolutionContext context)
        {
            if (source.HingeHoleOption == null)
                return null;

            var config = new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>());
            var mapper = new Mapper(config);

            var option = mapper.Map<HingeHoleOptionDto, HingeHoleOption>(source.HingeHoleOption);

            return option;
        }
    }
}