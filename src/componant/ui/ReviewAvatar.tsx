function initialsFromName(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) {
        const w = parts[0];
        return w.slice(0, Math.min(2, w.length)).toUpperCase();
    }
    const first = parts[0][0] ?? '';
    const last = parts[parts.length - 1][0] ?? '';
    return (first + last).toUpperCase();
}

function paletteIndex(name: string): number {
    let h = 0;
    for (let i = 0; i < name.length; i += 1) {
        h = Math.imul(31, h) + name.charCodeAt(i);
    }
    return Math.abs(h) % AVATAR_PALETTE.length;
}

const AVATAR_PALETTE = [
    'bg-sky-100 text-sky-800',
    'bg-violet-100 text-violet-800',
    'bg-emerald-100 text-emerald-800',
    'bg-amber-100 text-amber-900',
    'bg-rose-100 text-rose-800',
    'bg-cyan-100 text-cyan-900',
    'bg-fuchsia-100 text-fuchsia-900',
    'bg-teal-100 text-teal-900',
    'bg-indigo-100 text-indigo-900',
] as const;

import Image from './Image';

export interface ReviewAvatarProps {
    name: string;
    profileImage?: string;
    className?: string;
    imageClassName?: string;
}

/**
 * Profile photo when `profileImage` is set; otherwise initials from `name`.
 */
const ReviewAvatar = ({ name, profileImage, className = '', imageClassName = '' }: ReviewAvatarProps) => {
    if (profileImage) {
        return (
            <Image
                className={`h-12 w-12 min-h-12 min-w-12 shrink-0 rounded-full border-2 border-gray-100 object-cover ${imageClassName} ${className}`}
                url={profileImage}
                alt={`${name}'s profile`}
                width={55}
                height={55}
            />
        );
    }

    const initials = initialsFromName(name);
    const tone = AVATAR_PALETTE[paletteIndex(name)];

    return (
        <span
            className={`inline-flex h-12 w-12 min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full border-2 border-gray-100 text-sm font-semibold leading-none ${tone} ${className}`}
            aria-label={`${name} avatar`}
        >
            <span className="select-none" aria-hidden>
                {initials}
            </span>
        </span>
    );
};

export default ReviewAvatar;
