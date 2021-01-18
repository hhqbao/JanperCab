using _1_Domain.Enum;
using _3_Application.Dtos.DuraformOption;
using System;

namespace _3_Application.Dtos.DuraformOptionType
{
    public class DuraformOptionTypeDto
    {
        public DuraformOptionTypeKey Id { get; set; }

        public string Name { get; set; }

        public string Type
        {
            get
            {
                switch (Id)
                {
                    case DuraformOptionTypeKey.NoFaceRoute:
                        return typeof(DuraformOptionNoFaceDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.DoubleSided:
                        return typeof(DuraformOptionDoubleSidedDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.FoldBack:
                        return typeof(DuraformOptionFoldBackDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.PaneFrame:
                        return typeof(DuraformOptionPaneFrameDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.RollerShutter:
                        return typeof(DuraformOptionRollerShutterFrameDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.MicrowaveFrame:
                        return typeof(DuraformOptionMicrowaveFrameDto).AssemblyQualifiedName;
                    case DuraformOptionTypeKey.AngledShelf:
                        return typeof(DuraformOptionAngledShelfDto).AssemblyQualifiedName;
                    default:
                        throw new NotImplementedException("Duraform Option Type Not Recognized");
                }
            }
        }
    }
}