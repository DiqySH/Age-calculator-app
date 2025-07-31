import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const [years, setYears] = useState(null);
  const [months, setMonths] = useState(null);
  const [days, setDays] = useState(null);
  const [validate, setValidate] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isValidDate = (day, month, year) => {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };
  function getAgeDistance(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const diffMs = today - birthDate;
    const diffDate = new Date(diffMs);
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();
    let totalYears = years;
    let totalMonths = months;
    let totalDays = days;
    if (totalDays < 0) {
      totalMonths--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      totalDays += prevMonth.getDate();
    }
    if (totalMonths < 0) {
      totalYears--;
      totalMonths += 12;
    }
    return {
      years: totalYears,
      months: totalMonths,
      days: totalDays,
    };
  }
  const onSubmit = async (data) => {
    if (isValidDate(Number(data.day), Number(data.month), Number(data.year))) {
      setValidate(false);
      const { years, months, days } = getAgeDistance(
        Number(data.day),
        Number(data.month),
        Number(data.year)
      );
      setYears(years);
      setMonths(months);
      setDays(days);
    } else {
      setValidate(true);
    }
  };
  return (
    <>
      <main className="w-full min-h-screen bg-[#f0f0f0] grid place-items-center">
        <section className="w-full grid place-items-center px-[1rem] md:px-0">
          <div className="max-w-[840px] w-full bg-white md:px-16 py-12 rounded-[1rem] rounded-br-[12rem] flex flex-col md:gap-0 gap-16 px-6">
            <form
              className="flex flex-col md:gap-8 gap-16"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex md:gap-[2rem] gap-4">
                <label htmlFor="day" className="flex flex-col gap-2">
                  <p className="text-[14px] font-bold text-[#6B6B6B] tracking-wide">
                    DAY
                  </p>
                  <input
                    type="number"
                    id="day"
                    placeholder="DD"
                    className="border-1 border-solid border-black rounded-[0.5rem] focus:border-[#864CFF] active:border-[#864CFF] outline-[#864CFF] md:text-[32px] text-[20px] py-4 md:px-6 px-3 font-bold max-w-[160px] w-full"
                    {...register("day", { required: true })}
                  />
                </label>
                <label htmlFor="month" className="flex flex-col gap-2">
                  <p className="text-[14px] font-bold text-[#6B6B6B] tracking-wide">
                    MONTH
                  </p>
                  <input
                    type="number"
                    id="month"
                    placeholder="MM"
                    className="border-1 border-solid border-black rounded-[0.5rem] focus:border-[#864CFF] active:border-[#864CFF] outline-[#864CFF] md:text-[32px] text-[20px] py-4 md:px-6 px-3 font-bold max-w-[160px] w-full"
                    {...register("month", { required: true })}
                  />
                </label>
                <label htmlFor="year" className="flex flex-col gap-2">
                  <p className="text-[14px] font-bold text-[#6B6B6B] tracking-wide">
                    YEAR
                  </p>
                  <input
                    type="number"
                    id="year"
                    placeholder="YYYY"
                    className="border-1 border-solid border-black rounded-[0.5rem] focus:border-[#864CFF] active:border-[#864CFF] outline-[#864CFF] md:text-[32px] text-[20px] py-4 md:px-6 px-3 font-bold max-w-[160px] w-full"
                    {...register("year", { required: true })}
                  />
                </label>
              </div>
              {validate ? (
                <p className="text-red-400">Invalid date or something.</p>
              ) : null}
              <div className="flex relative md:w-[90%] w-full">
                <div
                  className="w-full min-h-[1px] max-h-[1px]"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                />
                <input
                  type="submit"
                  value={""}
                  className="md:min-w-[96px] md:max-w-[96px] md:h-[96px] min-w-[64px] max-w-[64px] h-[64px] bg-[#864CFF] bg-no-repeat bg-center rounded-full absolute md:right-[-48px] md:top-[-48px] top-[-32px] md:bg-size-[50%] bg-size-[32px] hover:bg-black cursor-pointer max-[48px]:left-0 right-0 tombol"
                  style={{
                    backgroundImage: "url(/icon-arrow.svg)",
                    transition: "all ease-in-out 250ms",
                  }}
                />
              </div>
            </form>
            <div className="md:text-[108px] font-bold tracking-tight italic flex flex-col gap-1 text-[56px]">
              <p className="leading-[100%]">
                <span className="text-[#864CFF]">{years ? years : "--"}</span>{" "}
                years
              </p>
              <p className="leading-[100%]">
                <span className="text-[#864CFF]">{months ? months : "--"}</span>{" "}
                months
              </p>
              <p className="leading-[100%]">
                <span className="text-[#864CFF]">{days ? days : "--"}</span>{" "}
                days
              </p>
            </div>
          </div>
        </section>
      </main>
      <div className="grid place-items-center">
        <p>Made with love ❤️ by <a href="https://github.com/DiqySH" className="text-blue-700">Diqy</a></p>
      </div>
    </>
  );
}

export default App;
