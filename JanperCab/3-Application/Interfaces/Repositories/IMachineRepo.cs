using _1_Domain;

namespace _3_Application.Interfaces.Repositories
{
    public interface IMachineRepo : IBaseRepository<Machine>
    {
        public DuraformProcessRouting ProcessRouting(MachineRouter router, DuraformEnquiry duraformEnquiry);

        public DuraformProcessPressing ProcessPressing(MachinePresser presser, DuraformEnquiry duraformEnquiry);

        public DuraformProcessCleaning ProcessCleaning(MachineCleaning cleaner, DuraformEnquiry duraformEnquiry);

        public DuraformProcessPacking ProcessPacking(MachinePacking packer, DuraformEnquiry duraformEnquiry);
    }
}