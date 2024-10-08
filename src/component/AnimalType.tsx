import { AnimalType } from "domain/entities/Animals";
import { PiCatDuotone, PiDogDuotone } from "react-icons/pi";
import { IconType } from "react-icons";

interface AnimalProps {
  type: AnimalType;
  iconProps?: React.ComponentProps<IconType>;
}

const AnimalTypeComponent = ({ type, iconProps }: AnimalProps) => {
  let Icon: IconType | null = null; // Inicialmente null

  switch (type) {
    case "cat":
      Icon = PiCatDuotone;
      break;

    case "dog":
      Icon = PiDogDuotone;
      break;

    default:
      break;
  }

  return Icon ? <Icon {...iconProps} /> : null;
};

export default AnimalTypeComponent;
