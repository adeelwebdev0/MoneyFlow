interface Props {
  label: string;
  amount: number;
  color: string;
}

const SummaryCard = ({ label, amount, color }: Props) => {
  return (
    <div className={`rounded-xl p-5 shadow-sm text-white ${color}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="text-2xl font-bold mt-1">
        ${amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};

export default SummaryCard;
