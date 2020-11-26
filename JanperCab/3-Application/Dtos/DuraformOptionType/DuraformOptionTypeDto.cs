using _3_Application.Dtos.DuraformOption;
using System;

namespace _3_Application.Dtos.DuraformOptionType
{
    public class DuraformOptionTypeDto
    {
        public _1_Domain.DuraformOptionType.DuraformOptionTypeKey Id { get; set; }

        public string Name { get; set; }

        public string Type
        {
            get
            {
                switch (Id)
                {
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.NoFaceRoute:
                        return typeof(DuraformOptionNoFaceDto).AssemblyQualifiedName;
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.DoubleSided:
                        return typeof(DuraformOptionDoubleSidedDto).AssemblyQualifiedName;
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.FoldBack:
                        return typeof(DuraformOptionFoldBackDto).AssemblyQualifiedName;
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.PaneFrame:
                        return typeof(DuraformOptionPaneFrameDto).AssemblyQualifiedName;
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.RollerShutter:
                        return typeof(DuraformOptionRollerShutterFrameDto).AssemblyQualifiedName;
                    case _1_Domain.DuraformOptionType.DuraformOptionTypeKey.MicrowaveFrame:
                        return typeof(DuraformOptionMicrowaveFrameDto).AssemblyQualifiedName;
                    default:
                        throw new NotImplementedException("Duraform Option Type Not Recognized");
                }
            }
        }
    }
}