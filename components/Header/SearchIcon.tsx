import { IconBaseProps } from "react-icons";
import { BsSearch } from "react-icons/bs";

export type SearchIconProps = IconBaseProps & {};

const SearchIcon: React.FC<SearchIconProps> = ({ ...props }) => {
  return <BsSearch {...props} />;
};

export default SearchIcon;
