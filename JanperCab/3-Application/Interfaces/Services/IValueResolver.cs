using AutoMapper;

namespace _3_Application.Interfaces.Services
{
    public interface IValueResolver<in TSource, in TDestination, TDestMember>
    {
        TDestMember Resolve(TSource source, TDestination destination, TDestMember destMember, ResolutionContext context);
    }
}