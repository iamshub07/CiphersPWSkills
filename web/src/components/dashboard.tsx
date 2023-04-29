import { api } from "@/utils/api";
import Navbar from "@/components/Navbar";
import Image from "next/image";

const Dashboard = () => {
  const localStorageUserName =
    typeof window !== "undefined" ? localStorage.getItem("username") : null;
  console.log(localStorageUserName);
  const user = localStorageUserName
    ? api.user.get.useQuery({
        username: localStorageUserName,
      })
    : null;

  if (!user || user.isLoading || user.isFetching) {
    return <div>Loading...</div>;
  }

  if (user.isError || !user.data) {
    return <div>Error...</div>;
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      <main className="flex w-screen flex-1 flex-row text-sm">
        <div className="flex w-[40vw] flex-col gap-8 p-8">
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Trip Details</div>
            <div className="flex flex-col gap-4 rounded-lg border-2 border-gray-200 p-4">
              <div>
                <div className="mb-2 text-xs text-gray-400">Pickup Address</div>
                <div className="flex flex-row gap-4 ">
                  <span>
                    iNeuron.ai, 17th floor tower, A Bridge Signature Towers,
                    Sannatam.....
                  </span>
                  <Image src="/svg/gps.svg" alt="gps" width={20} height={20} />
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs text-gray-400">
                  Destination Address
                </div>
                <div className="flex flex-row gap-4">
                  <span>
                    Cambridge Institute of Technology, Krishnarajapura, KR
                    Puram, B.....
                  </span>
                  <Image src="/svg/gps.svg" alt="gps" width={20} height={20} />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Select a ride type</div>
            <div className="flex flex-row gap-4 rounded-lg border-2 border-gray-200 p-4">
              <Image src="/svg/car.svg" alt="car" width={40} height={40} />
              <div className="flex flex-col">
                <div>Joyride Cab</div>
                <div className="text-xs text-gray-400">
                  Use this rides for you need upto 4 seats
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Select timings</div>
            <div className="flex w-full flex-row justify-between gap-4">
              <div className="flex flex-1 flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
                <div className="flex flex-col">
                  <div>Book it right away</div>
                  <div className="text-xs text-gray-400">
                    Pickup in 6 minutes
                  </div>
                </div>
                <input type="checkbox" className="w-[1rem] rounded-lg" />
              </div>
              <div className="flex flex-1 flex-row justify-between rounded-lg border-2 border-gray-200 p-4">
                <div className="flex flex-col">
                  <div>Schedule for later</div>
                  <div className="text-xs text-gray-400">
                    30 April 2023 5:00 PM
                  </div>
                </div>
                <input type="checkbox" className="w-[1rem] rounded-lg" />
              </div>
            </div>
          </div>
          <div className="">
            <div className="mb-2 ml-4 text-joy-green">Payment Details</div>
            <div className="flex flex-row gap-4 rounded-lg border-2 border-gray-200 p-4">
              <div className="flex w-full flex-col">
                <div className="mb-1">
                  Your fair for the ride is
                  <span className="font-bold text-joy-green"> ₹164</span>
                </div>
                <div className="text-xs text-gray-400">
                  Select payment method
                </div>
                <div className="flex w-full flex-row items-center gap-8">
                  <div className="flex flex-row items-center gap-2">
                    <input
                      name="pay-at-drop"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="pay-at-drop">Pay at drop</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      name="phonepay"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="phonepay">PhonePay</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      name="Cash"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="Cash">Cash</label>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <input
                      name="joywallet"
                      type="checkbox"
                      className="w-[1rem] rounded-lg"
                    />
                    <label htmlFor="joywallet">JoyWallet</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60vw]">
          <iframe
            className="h-full w-full border-none"
            loading="lazy"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE
    &q=Signature+Brigade,Bangalore+IN"
          ></iframe>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
