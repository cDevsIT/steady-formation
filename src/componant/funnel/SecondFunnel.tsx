import { useEffect, useState } from "react";
import { FunnelHeading } from "../ui/FunnelHeading";
import CompanySelectSection from "./Comp/CompanySelectSection";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { industries, llcTypes, numOfOwnerShip } from "./funnel.type";
import companyFormationService, { CompanyFormationData } from "@/lib/companyFormationService";
import stateFeesService from "@/lib/stateFeesService";
import { useStates } from "@/hooks/useStates";
export interface ChildComponentProps {
    handleFormSubmit: (data: CustomFormData) => void;
}

const SecondFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit }) => {
    const [data, setData] = useState<CompanyFormationData>({ currentStep: 1 });
    const [selected, setSelected] = useState(data?.businessType || 'llc');
    const [formMethods, setFormMethods] = useState<any>(null);
    const [isLoadingFees, setIsLoadingFees] = useState(false);
    const { states: usStates, isLoading: isLoadingStates } = useStates();

    const [watchedValues, setWatchedValues] = useState<any>({});

    const companyType = selected === 'llc' || selected === 'multiLLC' ? llcTypes : selected === 's_corp' ? [{ label: 'S Corporation (Owners must be U.S Resident)', value: 's_corp' }] : selected === 'c_corp' ? [{ label: 'C Corporation', value: 'c_corp' }] : selected === 'partnership' ? [{ label: 'Partnership', value: 'partnership' }] : [];

    // Load initial data from localStorage using the new service
    useEffect(() => {
        const localData = companyFormationService.getFromLocalStorage();
        setData(localData);
        setSelected(localData?.businessType || 'llc');
    }, []);


    useEffect(() => {
        if (formMethods && usStates.length > 0) {
            formMethods.reset({
                //remove This
                llcType: "singleLLC",
                industryType: "technology",
                stateName: usStates[0]?.value || "Colorado",
                numOfOwnerShip: 1,
            });
        }
    }, [data, formMethods, usStates]);

    const handleSubmit = (data: CustomFormData) => {
        // Save the business details to localStorage
        companyFormationService.saveToLocalStorage({
            ...data,
            businessType: selected,
            businessDetails: {
                industryType: data.industryType,
                llcType: data.llcType,
                stateName: data.stateName,
                number_of_ownership: data.numOfOwnerShip,
                multi_member_info: []
            },
            currentStep: 3
        });
        
        handleFormSubmit({ stepTwo: data, businessType: selected });
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);

        // Set up watchers for specific fields
        const subscription = methods.watch((value: any, { name, type }: any) => {
            setWatchedValues(value);
            
            // If state name changes, fetch and store state fees
            if (name === 'stateName' && value.stateName) {
                fetchAndStoreStateFees(value.stateName);
            }
        });

        // Cleanup subscription when component unmounts or form changes
        return () => subscription.unsubscribe();
    };

    // Fetch and store state fees when state is selected
    const fetchAndStoreStateFees = async (stateName: string) => {
        setIsLoadingFees(true);
        try {
            const stateFees = await stateFeesService.getStateFees(stateName);
            
            // Store state fees in localStorage for use in sidebar
            const currentData = companyFormationService.getFromLocalStorage();
            companyFormationService.saveToLocalStorage({
                ...currentData,
                stateFees: stateFees
            });
        } catch (error) {
            console.error('Error fetching state fees:', error);
            // Set default fees if API fails
            const currentData = companyFormationService.getFromLocalStorage();
            companyFormationService.saveToLocalStorage({
                ...currentData,
                stateFees: {
                    registration_fee: 100, // Default fallback
                    renewal_fee: 50,
                    transfer_fee: 25
                }
            });
        } finally {
            setIsLoadingFees(false);
        }
    };

    const showNumberOfOwnership = (selected === 'llc' && watchedValues.llcType === 'singleLLC') || selected === 'non_profit'

    const companyNameLabel = selected === 's_corp' || selected === 'c_corp' ? 'Corporation Type ' : 'Select LLC Type';

    return (
        <div className="lg:max-w-[730px]">
            <FunnelHeading>
                Business Info
            </FunnelHeading>

            <CompanySelectSection selected={selected} setSelected={setSelected} />

            <ReusableForm
                onSubmit={handleSubmit}
                submitText="Continue"
                onFormStateChange={handleFormStateChange}
                className="mb-5 mt-10"
            >
                {selected !== 'non_profit' && <InputField
                    name="llcType"
                    label={companyNameLabel}
                    type="select"
                    required
                    placeholder="Select llc type"
                    options={companyType}
                    className="lg:col-span-2 mb-1"
                />}

                <InputField
                    name="stateName"
                    label="State Name"
                    type="select"
                    required
                    placeholder={isLoadingStates ? "Loading states..." : "Select State Name"}
                    options={usStates}
                    className="mb-1"
                    disabled={isLoadingStates}
                />
                
                {isLoadingStates && (
                    <div className="text-sm text-gray-500 mb-1">
                        Loading available states from API...
                    </div>
                )}

                <InputField
                    name="industryType"
                    label="Type of Industry"
                    type="select"
                    required
                    placeholder="Select Industry Type"
                    options={industries}
                    className="mb-1"
                />

                {!showNumberOfOwnership &&
                    <InputField
                        name="numOfOwnerShip"
                        label="Number Of Ownership"
                        type="select"
                        required
                        placeholder="Select Num of Ownership"
                        options={numOfOwnerShip}
                        className="lg:col-span-2 mb-1"
                    />}

                {selected === 'non_profit' && <InputField
                    name="numOfOwnerShip"
                    label="Number of Director minimum 3, upto 15"
                    type="select"
                    required
                    placeholder="Select Num of Director"
                    options={numOfOwnerShip}
                    className="lg:col-span-2 mb-1"
                />}

                <div className="lg:col-span-2 mb-1">
                    <p className="text-sm font-medium text-black">State governments charge a one-time LLC formation fee which varies by state. This fee is required to legally register your business. Based on your selected state, we&apos;ll show the exact amount on the next step.</p>
                    {watchedValues.stateName && (
                        <div className="mt-3 mb-4">
                            {isLoadingFees ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                    <span className="text-sm text-gray-600">Loading state fees...</span>
                                </div>
                            ) : (
                                <h4 className="font-bold text-[18px] text-black">
                                    In {watchedValues.stateName}, the filing fee will be shown in the order summary
                                </h4>
                            )}
                        </div>
                    )}
                </div>



            </ReusableForm>
        </div>
    );
};

export default SecondFunnel;