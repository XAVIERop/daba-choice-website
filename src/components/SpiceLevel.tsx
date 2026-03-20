import { Utensils } from "lucide-react";

export function SpiceLevel({ level }: { level: number }) {
  if (level === 0) return null;
  
  return (
    <div className="flex items-center gap-1" title={`Spice Level: ${level}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Utensils 
          key={i} 
          size={14} 
          className={i < level ? "text-accent fill-accent" : "text-white/10"} 
        />
      ))}
    </div>
  );
}
