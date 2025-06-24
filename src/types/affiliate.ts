export interface AffiliateUser {
    id: string;
    name: string;
    email: string;
    commissionRate: number;
    totalEarnings: number;
    referralCount: number;
    status: 'active' | 'inactive' | 'pending';
    joinDate: Date;
}

export interface AffiliateCommission {
    id: string;
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    date: Date;
    description: string;
}

export interface AffiliateReferral {
    id: string;
    customerName: string;
    customerEmail: string;
    service: string;
    amount: number;
    commission: number;
    status: 'pending' | 'completed' | 'cancelled';
    date: Date;
} 