const DetailRow = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center text-muted-foreground">
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
    </div>
    <span className={`font-medium text-right ${valueClassName}`}>{value}</span>
  </div>
);

export { DetailRow };
