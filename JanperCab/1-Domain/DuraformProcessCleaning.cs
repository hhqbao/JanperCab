﻿using _1_Domain.Enum;

namespace _1_Domain
{
    public class DuraformProcessCleaning : DuraformProcess
    {
        public DuraformProcessCleaning()
        {
            DuraformProcessType = DuraformProcessEnum.Cleaning;
        }
    }
}