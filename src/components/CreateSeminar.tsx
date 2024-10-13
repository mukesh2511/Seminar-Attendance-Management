"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useGeolocation, { GeolocationResult } from "./useGeolocation";
const { v4: uuidv4 } = require("uuid");

interface CustomGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

const CreateSeminar = () => {
  const Router = useRouter();

  const [code, setCode] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [ipAddTeacher, setIpAddTeacher] = useState<string>("00:00:00");
  const [isLocationchecked, SetIsLocationCheck] = useState(false);
  const [className, setClassName] = useState<string>("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);

  ////////////geolocation
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
    setIpAddTeacher(data.ip);
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

  const GeneratePassCode = () => {
    if (!code) {
      const uniqueId = uuidv4().replace(/-/g, "");
      const uniqueCode = uniqueId.slice(0, 8);
      setCode(uniqueCode);
    }
  };
  const validateFields = () => {
    return className !== "" && code !== "";
  };
  const validateLocation = () => {
    return latitude !== 0 && longitude !== 0 && ipAddTeacher !== "00:00:00";
  };

  useEffect(() => {
    setDisable(!validateFields());
  }, [code, className]);

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
  //     setIpAddTeacher(data.ip);
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
      setIpAddTeacher("00:00:00");
    }
  };

  //////create seminar
  const handleCreateSeminar = async (e: FormEvent) => {
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
      if (className.length < 2) {
        setLoading(false);
        toast.error("ClassName must be minimum 2 characters!!");
        return;
      }
      const classData = {
        className,
        code,
        latitude,
        longitude,
        accuracy,
        ipAddTeacher,
      };
      const res = await toast.promise(
        axios.post("/api/class/createclass", classData),
        {
          loading: "Creating Seminar...",
          success: "Seminar Created Successfully!",
          error: "Failed to Create Seminar",
        }
      );
      console.log(res.data.data);
      if (res.status == 422) {
        toast.error(res.data.message);
      }
      if (res.status == 401) {
        toast.error(res.data.message);
      }
      if (res.status === 201) {
        // console.log("HEHHEHEHE");

        // const id = res?.data?.data?._id;
        // console.log(`Emitting join-class with id: ${id}`);
        // socket.emit("join-class", id);

        Router.push(`/Class/${res?.data?.data?._id}`);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // useEffect(() => {
  //   // Initialize socket connection
  //   socket = io(); // Replace with your backend URL
  //   return () => {
  //     // Disconnect socket on unmount
  //     if (socket) {
  //       socket.disconnect();
  //     }
  //   };
  // }, []);

  return (
    <>
      <Toaster />
      <div>
        <div className="flex justify-center items-center h-[calc(100%-5rem)] mt-10 my-auto mx-auto">
          <div className="shadow-lg bg-white w-full max-w-4xl h-auto flex flex-col md:flex-row rounded-lg overflow-hidden">
            {/* Left Section - Form */}
            <div className="w-full p-8">
              <h2 className="text-2xl font-bold text-gray-700">
                Enter details to create class.
              </h2>

              <form className="space-y-4 mt-5" onClick={handleCreateSeminar}>
                <div>
                  <label htmlFor="">Class Name</label>
                  <input
                    minLength={2}
                    maxLength={40}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setClassName(e.target.value)
                    }
                    type="text"
                    placeholder="Class Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                {/* <div>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div> */}
                {/* <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  </div> */}
                <div>
                  <label htmlFor="">Passcode</label>
                  <input
                    type="text"
                    placeholder="Enter your Passcode"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    defaultValue={code}
                    onFocus={GeneratePassCode}
                    minLength={8}
                    maxLength={8}
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
                    "Create Seminar"
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

export default CreateSeminar;
