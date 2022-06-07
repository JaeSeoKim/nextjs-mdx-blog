const Button = ({}: { test: string }) => {
  return (
    <button className="transition duration-150 ease-in-out p-2 rounded bg-zinc-100 border border-gray-300 hover:border-gray-400">
      Hello Button!
    </button>
  );
};

export default Button;
