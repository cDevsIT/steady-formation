export interface Review {
    id: string;
    type: 'trustpilot' | 'google' | 'video';
    profileImage: string;
    name: string;
    position: string;
    title: string;
    description: string;
    rating: number;
    date?: string;
    videoUrl?: string; // For video reviews
}

export interface ReviewsSectionProps {
    reviews: Review[];
    variant: 'home' | 'review-page';
    title?: string;
    subtitle?: string;
  }