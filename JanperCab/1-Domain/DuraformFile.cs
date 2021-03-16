namespace _1_Domain
{
    public class DuraformFile : ApplicationFile
    {
        public int DuraformEnquiryId { get; set; }

        public string Description { get; set; }


        public virtual DuraformEnquiry DuraformEnquiry { get; set; }
    }
}