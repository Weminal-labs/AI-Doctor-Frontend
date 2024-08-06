export default function CodeExecBox() {
  return (
    <div className="bg-[#0F0E1B] py-2 ps-6 pe-2.5 flex flex-row items-center justify-between rounded-lg border-[#282732] border-2">
      <div>Do you want to get the example result?</div>
      <div className="bg-white flex flex-row justify-center items-center w-[100px] h-[40px] rounded-lg cursor-pointer hover:bg-gray-300">
        <span className="text-gray-800 font-bold ms-1">RUN</span>
        <span className="material-symbols-outlined text-gray-800 ms-1">
          play_circle
        </span>
      </div>
    </div>
  );
}
