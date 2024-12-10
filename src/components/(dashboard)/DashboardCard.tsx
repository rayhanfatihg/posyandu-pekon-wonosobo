import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description: string;
  value: number | string;
  unit: string;
}

export function DashboardCard({
  title,
  description,
  value,
  unit,
}: DashboardCardProps) {
  return (
    <Card className="p-4 w-full">
      <CardTitle>
        <h3 className="font-bold">{title}</h3>
      </CardTitle>

      <CardDescription className="mt-2">
        <p>{description}</p>
      </CardDescription>

      <CardFooter className="p-0 mt-4">
        <p className="text-5xl font-bold flex flex-col">
          {value}{" "}
          <span className="text-sm text-card-foreground opacity-45">
            {unit}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
