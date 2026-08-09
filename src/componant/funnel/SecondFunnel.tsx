import { useEffect, useState } from "react";
import { FunnelHeading } from "../ui/FunnelHeading";
import CompanySelectSection from "./Comp/CompanySelectSection";
import { dataState } from "./Funnel";
import { CustomFormData } from "../ui/FormSample";
import { InputField, ReusableForm } from "../ui/ReusableForm";
import { industries, llcTypes, numOfOwnerShip, numOfDirectors } from "./funnel.type";
import companyFormationService, { CompanyFormationData } from "@/lib/companyFormationService";
import stateFeesService from "@/lib/stateFeesService";
import { useStates } from "@/hooks/useStates";

const MULTIMEMBER_FEE_AMOUNT = 100;

/** S/C corp and partnership always use multi-style pricing; LLC defaults to multi unless Single Member is chosen. */
function computeMultimemberFee(businessType: string, llcType: string | undefined): number {
    if (businessType === "s_corp" || businessType === "c_corp" || businessType === "partnership") {
        return MULTIMEMBER_FEE_AMOUNT;
    }
    if (businessType === "llc" || businessType === "multiLLC") {
        if (llcType === "singleLLC") return 0;
        return MULTIMEMBER_FEE_AMOUNT;
    }
    return 0;
}

export interface ChildComponentProps {
    handleFormSubmit: (data: CustomFormData) => void;
    onFormStateChange?: (formState: { businessType: string; llcType?: string }) => void;
}

const SecondFunnel: React.FC<ChildComponentProps> = ({ handleFormSubmit, onFormStateChange }) => {
    const [data, setData] = useState<CompanyFormationData>({ currentStep: 1 });
    const [selected, setSelected] = useState(() => {
        // Initialize from localStorage on first render
        const localData = companyFormationService.getFromLocalStorage();
        return localData?.businessType || 'llc';
    });
    const [formMethods, setFormMethods] = useState<any>(null);
    const [isLoadingFees, setIsLoadingFees] = useState(false);
    const [multimemberFee, setMultimemberFee] = useState(() => {
        const localData = companyFormationService.getFromLocalStorage();
        const bt = localData?.businessType || "llc";
        const lt = localData?.businessDetails?.llcType;
        if (typeof localData?.multimemberFee === "number") return localData.multimemberFee;
        return computeMultimemberFee(bt, lt);
    });
    const { states: usStates, isLoading: isLoadingStates } = useStates();

    const [watchedValues, setWatchedValues] = useState<any>({});

    const companyType = selected === 'llc' || selected === 'multiLLC' ? llcTypes : selected === 's_corp' ? [{ label: 'S Corporation (Owners must be U.S Resident)', value: 's_corp' }] : selected === 'c_corp' ? [{ label: 'C Corporation', value: 'c_corp' }] : selected === 'partnership' ? [{ label: 'Partnership', value: 'partnership' }] : [];

    const llcTypeComputed: string | undefined =
        selected === 'llc' ? 'multiLLC'
        : selected === 's_corp' ? 's_corp'
        : selected === 'c_corp' ? 'c_corp'
        : selected === 'partnership' ? 'partnership'
        : selected === 'non_profit' ? 'non_profit'
        : undefined;

    // Load initial data from localStorage using the new service
    useEffect(() => {
        const localData = companyFormationService.getFromLocalStorage();
        setData(localData);
        
        // Ensure businessType is properly loaded from localStorage
        const savedBusinessType = localData?.businessType || 'llc';
        setSelected(savedBusinessType);
        
    }, []);


    useEffect(() => {
        if (formMethods) {
            const savedDetails = companyFormationService.getFromLocalStorage()?.businessDetails;
            const savedLlc = savedDetails?.llcType;
            const defaultLlcType =
                (selected === "llc" || selected === "multiLLC") &&
                (savedLlc === "singleLLC" || savedLlc === "multiLLC")
                    ? savedLlc
                    : llcTypeComputed;

            formMethods.reset({
                llcType: defaultLlcType,
                numOfOwnerShip: selected === 'non_profit' ? 3 : 2,
                stateName: companyFormationService.getFromLocalStorage()?.businessDetails?.stateName || undefined,
            });
        }
    }, [data, formMethods, usStates, llcTypeComputed, selected]);

    // Notify parent when company type selection changes
    useEffect(() => {
        if (onFormStateChange) {
            onFormStateChange({
                businessType: selected,
                llcType: watchedValues.llcType
            });
        }
    }, [selected, watchedValues.llcType, onFormStateChange]);

    // Persist business type and computed llcType to localStorage on change for reload persistence
    useEffect(() => {
        try {
            const currentData = companyFormationService.getFromLocalStorage();
            const payload: Partial<CompanyFormationData> = {
                ...currentData,
                businessType: selected,
            };
            if (currentData.businessDetails) {
                const existingLlc = currentData.businessDetails.llcType;
                const isLlcFamily = selected === "llc" || selected === "multiLLC";
                const resolvedLlcType =
                    isLlcFamily && (existingLlc === "singleLLC" || existingLlc === "multiLLC")
                        ? existingLlc
                        : llcTypeComputed;
                payload.businessDetails = {
                    ...currentData.businessDetails,
                    llcType: resolvedLlcType ?? llcTypeComputed,
                } as CompanyFormationData['businessDetails'];
            }
            companyFormationService.saveToLocalStorage(payload);
        } catch (err) {
            console.error('Failed to persist business type/llcType', err);
        }
    }, [selected, llcTypeComputed]);

    // Keep multimember fee in sync with company type + LLC member type (incl. S/C corp like multi pricing)
    useEffect(() => {
        const stored = companyFormationService.getFromLocalStorage();
        const effectiveLlcType = watchedValues.llcType ?? stored?.businessDetails?.llcType;
        const newFee = computeMultimemberFee(selected, effectiveLlcType);
        setMultimemberFee(newFee);

        try {
            companyFormationService.saveToLocalStorage({
                ...stored,
                multimemberFee: newFee,
            });
        } catch (err) {
            console.error("Failed to persist multimemberFee", err);
        }
    }, [selected, watchedValues.llcType]);

    const handleSubmit = (data: CustomFormData) => {
        // Save the business details to localStorage
        console.log(data?.llcType)
        companyFormationService.saveToLocalStorage({
            ...data,
            businessType: selected,
            llcType: data.llcType,
            multimemberFee: multimemberFee,
            businessDetails: {
                industryType: data.industryType,
                llcType: data.llcType,
                stateName: data.stateName,
                number_of_ownership: data.numOfOwnerShip,
                multi_member_info: []
            },
            currentStep: 3
        });

        handleFormSubmit({ stepTwo: data, businessType: selected, llcType: data.llcType });
    };

    // Handle form state changes and set up watchers
    const handleFormStateChange = (methods: any) => {
        setFormMethods(methods);

        // Set up watchers for specific fields
        const subscription = methods.watch((value: any, { name, type }: any) => {
            setWatchedValues(value);
            
            // If state name changes, persist immediately and fetch fees
            if (name === 'stateName' && value.stateName) {
                try {
                    const currentData = companyFormationService.getFromLocalStorage();
                    const payload: Partial<CompanyFormationData> = {
                        ...currentData,
                        businessDetails: {
                            ...currentData.businessDetails,
                            stateName: value.stateName,
                        } as CompanyFormationData['businessDetails'],
                    };
                    companyFormationService.saveToLocalStorage(payload);
                } catch (err) {
                    console.error('Failed to persist stateName', err);
                }
                fetchAndStoreStateFees(value.stateName);
            }
            
            // Notify parent of form state changes for real-time sidebar updates
            if (onFormStateChange) {
                onFormStateChange({
                    businessType: selected,
                    llcType: value.llcType
                });
            }

            // Persist llcType changes immediately for reload persistence
            if (name === 'llcType') {
                try {
                    const currentData = companyFormationService.getFromLocalStorage();
                    const payload: Partial<CompanyFormationData> = {
                        ...currentData,
                        businessType: selected,
                    };
                    if (currentData.businessDetails) {
                        payload.businessDetails = {
                            ...currentData.businessDetails,
                            llcType: value.llcType,
                        } as CompanyFormationData['businessDetails'];
                    }
                    companyFormationService.saveToLocalStorage(payload);
                } catch (err) {
                    console.error('Failed to persist llcType', err);
                }
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
                    options={numOfDirectors}
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