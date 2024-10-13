"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useGeolocation, { GeolocationResult } from "./useGeolocation";

interface CustomGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const JoinSeminar = () => {
  const Router = useRouter();
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [ip, setIp] = useState<string>("00:00:00");
  const [code, setCode] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isLocationchecked, SetIsLocationCheck] = useState(false);

  //////geoLocation
  const { location, error } = useGeolocation();
  const [locationChecks, setLocationChecks] = useState<GeolocationResult[]>([]);
  console.log({ locationChecks });

  useEffect(() => {
    if (location && locationChecks.length < 3) {
      setLocationChecks((prev) => [...prev, location]);
    }
  }, [location]);

  const getAverageLocation = async () => {
    if (locationChecks.length === 0) return null;
    const sum = locationChecks.reduce(
      (acc, loc) => ({
        latitude: acc.latitude + loc.latitude,
        longitude: acc.longitude + loc.longitude,
        accuracy: acc.accuracy + loc.accuracy,
      }),
      { latitude: 0, longitude: 0, accuracy: 0 }
    );
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    setIp(data.ip);
    setLatitude(sum.latitude / locationChecks.length);
    setLongitude(sum.longitude / locationChecks.length);
    setAccuracy(sum.accuracy / locationChecks.length);
    return true;
    // return {
    //   latitude: sum.latitude / locationChecks.length,
    //   longitude: sum.longitude / locationChecks.length,
    //   accuracy: sum.accuracy / locationChecks.length,
    // };
  };
  console.log({ latitude, longitude, accuracy });

  // const getLocationandIp = async () => {
  //   try {
  //     const position: GeolocationPosition = await new Promise(
  //       (resolve, reject) => {
  //         const options: CustomGeolocationOptions = {
  //           enableHighAccuracy: true,
  //           timeout: 5000,
  //           maximumAge: 0,
  //         };

  //         navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //       }
  //     );

  //     setLatitude(position.coords.latitude);
  //     setLongitude(position.coords.longitude);

  //     const response = await fetch("https://api.ipify.org?format=json");
  //     const data = await response.json();
  //     setIp(data.ip);
  //   } catch (error) {
  //     toast.error("Failed to record location");
  //     console.log("Error retrieving location or IP:", error);
  //   }
  // };
  const handleCheckBoxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    SetIsLocationCheck(checked);

    if (checked) {
      const avgLocation = await getAverageLocation();
      // await getLocationandIp();
      if (!avgLocation) {
        setLoading(false);
        toast.error("Unable to verify location. Please try again.");
      } else {
        toast.success("Location Recorded Successfully");
      }
    } else {
      setLatitude(0);
      setLongitude(0);
      setIp("00:00:00");
    }
  };
  /////validate code
  const validateFields = () => {
    return code !== "";
  };
  /////validate location
  const validateLocation = () => {
    return latitude !== 0 && longitude !== 0 && ip !== "00:00:00";
  };
  useEffect(() => {
    setDisable(!validateFields());
  }, [code]);

  ///////join seminar function
  const JoinSeminar = async (e: FormEvent) => {
    e.preventDefault();
    if (disable) {
      return; // Prevent further execution if the button is disabled
    }

    try {
      setLoading(true);
      if (!validateLocation()) {
        setLoading(false);
        toast.error("Please Verify Location");
        return;
      }
      const payload = {
        latitude,
        longitude,
        accuracy,
        code,
        ip,
      };

      const res = await axios.post("/api/class/joinclass", payload);
      console.log({ data: res.data, data2: res.data.data });

      if (res.status === 202) {
        toast.success("You are already in class!!");
        Router.push(`/Class/${res?.data?.id}`);
      }
      if (res.status === 200) {
        toast.success(res.data.message);
        Router.push(`/Class/${res?.data?.id}`);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };
  console.log({ latitude, longitude });
  return (
    <>
      <Toaster />
      <div>
        <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
          <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg gap-5 overflow-hidden">
            {/* Left Section - Form */}
            <div className="w-full p-8">
              <h2 className="text-2xl font-bold text-gray-700">
                Enter details to Join class.
              </h2>

              <form className="space-y-5 mt-2" onSubmit={JoinSeminar}>
                <div>
                  <label htmlFor="">Passcode</label>
                  <input
                    type="text"
                    placeholder="Enter your Passcode"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    minLength={8}
                    maxLength={8}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
                      <p>Give Location Access</p>
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={isLocationchecked}
                        onChange={handleCheckBoxChange}
                      />
                    </div>
                  </div>
                  {/* /////TODO bluetooth access */}
                  {/* <div className="bg-[#5fda45] p-2 rounded-xl flex justify-between items-center">
                  <Link href="/">Give Bluetooth Access</Link>
                  <input type="checkbox" className="w-5 h-5" />
                  </div> */}
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg text-white transition duration-300 ${
                    disable
                      ? "bg-gray-400 cursor-not-allowed "
                      : loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5fda45] hover:bg-blue-600"
                  } 

                `}
                  disabled={loading}
                >
                  {loading ? (
                    <img
                      src="/spinner.gif"
                      alt="Loading..."
                      className="w-6 h-6 mx-auto"
                    />
                  ) : (
                    "Join Seminar"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinSeminar;
