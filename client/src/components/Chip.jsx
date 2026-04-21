const Chip = ({ label, active, onClick, name = " " }) => {
  return (
    <button
      onClick={onClick}
      className={`
    px-4 py-1.5 rounded-full text-xs transition tracking-wider border
    ${
      name === "budgetLevel"
        ? active
          ? "border-[#9cc300] text-[#9cc300] bg-transparent"
          : "border-[#4d4b4b]/50 text-white bg-transparent"
        : name === "creatorStyle"
          ? active
            ? "bg-[#262626] font-medium text-[#9cc300] border-transparent"
            : "bg-[#131313] text-white  border-transparent"
          : active
            ? "bg-[#9cc300] text-black border-transparent"
            : "bg-[#262626] text-white border-transparent"
    }
  `}
    >
      {label}
    </button>
  );
};


export default Chip
