namespace _1_Domain
{
    public class DuraformDrawer : DuraformComponent
    {
        public int NumberOfDrawers { get; set; }

        public int DuraformDrawerTypeId { get; set; }

        public bool HasDrillFronts { get; set; }

        public decimal? DrawerOne { get; set; }

        public decimal? DrawerTwo { get; set; }

        public decimal? DrawerThree { get; set; }

        public decimal? DrawerFour { get; set; }

        public decimal? DrawerFive { get; set; }


        public virtual DuraformDrawerType DuraformDrawerType { get; set; }
    }
}