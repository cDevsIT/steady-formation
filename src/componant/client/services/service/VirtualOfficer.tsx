"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const VirtualOfficer = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("payment");
    }, [router]);

    return null; // ensures nothing is rendered
};

export default VirtualOfficer;