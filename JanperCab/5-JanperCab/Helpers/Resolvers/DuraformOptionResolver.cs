﻿using _1_Domain;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.DuraformOption;
using AutoMapper;

namespace _5_JanperCab.Helpers.Resolvers
{
    public class DuraformOptionResolver : IValueResolver<DuraformComponentWithOptionDto, DuraformComponentWithOption, DuraformOption>
    {
        public DuraformOption Resolve(DuraformComponentWithOptionDto source, DuraformComponentWithOption destination,
            DuraformOption destMember, ResolutionContext context)
        {
            if (source.DuraformOption == null)
                return null;

            var config = new MapperConfiguration(cfg => cfg.AddProfile<MapperProfile>());
            var mapper = new Mapper(config);

            var option = mapper.Map<DuraformOptionDto, DuraformOption>(source.DuraformOption);

            return option;
        }
    }
}