"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artistFormSchema, ArtistFormData } from "../../lib/schemas";
import { saveArtist } from "../../lib/appwrite";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const categories = ["Singer", "Dancer", "DJ", "Speaker", "Musician"];
const languages = ["English", "Spanish", "French", "Hindi", "Mandarin"];
const feeRanges = [
  "$ (Under $500)",
  "$$ ($500-$2000)",
  "$$$ ($2000-$5000)",
  "$$$$ (Over $5000)",
];

export default function OnboardArtist() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(artistFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      feeRange: "",
      location: "",
      category: [],
      languages: [],
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      // Convert array fields to strings (if needed)
      const payload = {
        ...data,
        category: data.category.join(", "), // Convert array to string
        languages: data.languages.join(", "), // Convert array to string
      };

      await saveArtist(payload); // Send the modified data
      toast.success("Artist profile submitted successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to submit artist profile");
      console.error(error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profileImage", file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Artist Onboarding</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name *
            </label>
            <input
              {...register("name")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio *</label>
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full p-2 border rounded-md"
              placeholder="Tell us about your artistic background"
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <label className="block text-sm font-medium mb-2">Categories *</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={cat}
                  checked={watch("category").includes(cat)}
                  onChange={(e) => {
                    const current = watch("category");
                    if (e.target.checked) {
                      setValue("category", [...current, cat]);
                    } else {
                      setValue(
                        "category",
                        current.filter((c) => c !== cat)
                      );
                    }
                  }}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Languages Section */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Languages Spoken *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={lang}
                  checked={watch("languages").includes(lang)}
                  onChange={(e) => {
                    const current = watch("languages");
                    if (e.target.checked) {
                      setValue("languages", [...current, lang]);
                    } else {
                      setValue(
                        "languages",
                        current.filter((l) => l !== lang)
                      );
                    }
                  }}
                />
                <span>{lang}</span>
              </label>
            ))}
          </div>
          {errors.languages && (
            <p className="text-red-500 text-sm mt-1">
              {errors.languages.message}
            </p>
          )}
        </div>

        {/* Fee Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Fee Range *</label>
          <select
            {...register("feeRange")}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select your fee range</option>
            {feeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          {errors.feeRange && (
            <p className="text-red-500 text-sm mt-1">
              {errors.feeRange.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <input
            {...register("location")}
            className="w-full p-2 border rounded-md"
            placeholder="City, Country"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Profile Image
          </label>
          <div className="flex items-center space-x-4">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <label className="cursor-pointer">
              <span className="text-indigo-600 hover:text-indigo-800">
                {previewImage ? "Change Image" : "Upload Image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
    </div>
  );
}
