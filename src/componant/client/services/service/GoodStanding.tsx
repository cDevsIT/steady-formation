"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const GoodStanding = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("payment");
    }, [router]);

    return null; // ensures nothing is rendered
};

export default GoodStanding;