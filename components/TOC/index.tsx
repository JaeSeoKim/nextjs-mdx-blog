import { TOCItem } from "../../lib/plugins/rehypeTOC";
import DesktopTOC from "./DesktopTOC";
import MobileTOC from "./MobileTOC";

export type TOCProps = {
  data?: TOCItem[] | undefined;
  children?: React.ReactNode | undefined;
};

const TOC: React.FC<TOCProps> = ({ data, children }) => {
  return (
    <div className="w-full max-w-screen-md xl:max-w-screen-xl mx-auto">
      {data && <DesktopTOC data={data} />}
      <div className="max-w-screen-md px-4 mx-auto">
        {data && <MobileTOC data={data} />}
        {children}
      </div>
    </div>
  );
};

export default TOC;
