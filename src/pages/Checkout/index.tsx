import check from "../../assets/icons/check.svg";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function StepperItem({
  label,
  completed,
}: {
  label: string;
  completed: boolean;
}) {
  return (
    <li className="flex flex-col items-center">
      <span
        className={`${
          completed ? "bg-[#1a1a1a]" : "border-[#666666] border-[0.72px]"
        } min-h-10 min-w-10 md:min-h-[54px] md:min-w-[54px] rounded-full flex items-center justify-center`}
      >
        {completed ? (
          <img className="w-5" src={check} alt="" />
        ) : (
          <span className="text-[#666666] text-xl md:text-3xl">!</span>
        )}
      </span>
      <div className="flex flex-col">
        <span className="text-base text-center md:text-2xl font-medium leading-6">
          {label}
        </span>
      </div>
    </li>
  );
}

export default function CheckOutLayout() {
  const location = useLocation();
  const currentEndpoint = location.pathname.split("/").pop() as string;

  const stepsArray = ["address", "payment", "review"];

  // Map over the stepsArray and check if the current endpoint exists in the array
  const steps = stepsArray.map((step) => ({
    label: step.charAt(0).toUpperCase() + step.slice(1), // Capitalize the first letter of each step
    completed: stepsArray.indexOf(currentEndpoint) >= stepsArray.indexOf(step),
  }));

  return (
    <div className="flex h-full">
      <div className="w-full h-screen bg-slate-500 md:flex hidden flex-grow-0 ">
        <img
          src="https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full  flex object-cover "
        ></img>
      </div>
      <div className="h-screen w-full flex flex-col flex-grow justify-start items-start px-[5%] pb-[1vh] pt-[3vh]">
        <h1 className="text-black font-bold text-3xl">Checkout</h1>
        <div className=" w-full justify-between    flex   py-8 px-5 md:py-9 md:px-10  gap-6 md:gap-7">
          {steps.map((step, index) => (
            <StepperItem
              key={index}
              label={step.label}
              completed={step.completed}
            />
          ))}
        </div>
        <div className="w-full h-full  flex flex-col pt-5  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
