import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getImageUrl } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  value?: File;
  onChange: (file?: File) => void;
  /**
   * Existing image URL (from backend) or direct URL
   */
  existingImageUrl?: string | null;
  /**
   * Folder to look up for backend images
   */
  folder?: "books" | "users";
  label?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  existingImageUrl,
  folder = "users",
  label = "Upload Image",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  // Sync preview with value (File) or existingImageUrl
  useEffect(() => {
    if (value) {
      // If a new file is selected, create object URL
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (existingImageUrl) {
      // If no new file but existing URL, use it
      setPreview(getImageUrl(existingImageUrl, folder));
    } else {
      setPreview(null);
    }
  }, [value, existingImageUrl, folder]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Client-side validation
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      onChange(file);
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    // Reset input value to allow re-selecting same file
    const input = document.getElementById(
      `image-upload-${label}`
    ) as HTMLInputElement;
    if (input) input.value = "";
  };

  return (
    <div className="space-y-2">
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="border-border h-32 w-32 rounded-md border-2 object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={handleRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-2">
        <Input
          id={`image-upload-${label}`}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <Upload className="text-muted-foreground h-4 w-4" />
      </div>
      <p className="text-muted-foreground text-xs">
        Max file size: 5MB. Supported formats: JPG, PNG, GIF
      </p>
    </div>
  );
}
