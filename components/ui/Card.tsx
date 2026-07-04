import { cn } from "@/lib/cn";

type Props = {
  variant?: "glass" | "solid";
  className?: string;
  children: React.ReactNode;
};

export function Card({ variant = "solid", className, children }: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-colors duration-300",
        variant === "glass" ? "glass" : "gradient-border",
        className
      )}
    >
      {children}
    </div>
  );
}
