import { Card } from "@/components/ui/card";

interface AdBannerProps {
  size?: "large" | "medium" | "small";
  className?: string;
}

const AdBanner = ({ size = "medium", className = "" }: AdBannerProps) => {
  const sizeClasses = {
    large: "h-[250px] md:h-[300px]",
    medium: "h-[150px] md:h-[200px]",
    small: "h-[100px] md:h-[120px]",
  };

  return (
    <Card className={`${sizeClasses[size]} ${className} flex items-center justify-center bg-muted/30 border-dashed border-2`}>
      <div className="text-center text-muted-foreground">
        <p className="text-sm font-medium">Advertisement</p>
        <p className="text-xs mt-1">
          {size === "large" ? "728x90 / 970x250" : size === "medium" ? "728x90" : "320x50"}
        </p>
      </div>
    </Card>
  );
};

export default AdBanner;
