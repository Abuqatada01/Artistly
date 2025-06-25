import { z } from 'zod';

export const artistFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    bio: z.string().min(20, "Bio must be at least 20 characters"),
    feeRange: z.string().min(1, "Select a fee range"),
    location: z.string().min(2, "Location must be at least 2 characters"),
    category: z.array(z.string()).min(1, "Select at least one category"),
    languages: z.array(z.string()).min(1, "Select at least one language"),
    profileImage: z.instanceof(File).optional(),
});

export const ArtistFormData = artistFormSchema