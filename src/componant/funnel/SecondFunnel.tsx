import { FunnelHeading } from "../ui/FunnelHeading";
import CompanySelectSection from "./Comp/CompanySelectSection";
import FunnelSidebar from "./Comp/FunnelSidebar";

const SecondFunnel = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] gap-4 ">
            <div>
                <FunnelHeading>
                    Business Info
                </FunnelHeading>

                <CompanySelectSection />
            </div>
            <FunnelSidebar />
        </div>
    );
};

export default SecondFunnel;