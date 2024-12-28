import calculateAge from "@/atom/formatAge";
import About from "@/components/about";
import Interest from "@/components/interest";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Profile() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      push("/");
      return;
    }

    try {
      const decode = jwtDecode(token);
      setId(decode.id);
    } catch (error) {
      console.error("Token tidak valid:", error);
      push("/");
    }
  }, [push]);

  useEffect(() => {
    const response = async () => {
      try {
        const resData = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/showprofile/${id}`
        );
        setData(resData.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    response();
  }, [id]);

  return (
    <>
      <div
        className={`min-h-screen pt-[100px] py-2 bg-gradient-to-r from-regal-black from-10% via-regal-dark via-50% to-regal-gray to-100%`}
      >
        <div className="grid gap-2 mx-auto w-96 ">
          <div className="flex gap-2">
            <div className="flex px-2 gap-2">
              <img src="/images/left.png" className="w-2 h-4 my-auto" />
              <p className="flex gap-2 text-lg text-white my-auto"> Back</p>
            </div>
            <h1 className="font-semibold text-white text-lg my-auto ml-[60px] text-center">
              @{data.name}
            </h1>
          </div>

          <div className="w-[359px] relative h-[190px] rounded mx-auto bg-bck">
            {data.photo ? (
              <img
                src={process.env.NEXT_PUBLIC_BASE_API_URL + "/" + data.photo}
                alt="Profile Photo"
                className="w-full h-[190px] rounded  object-cover mx-auto "
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full bg-gray-400 mx-auto mt-4"></div>
            )}

            <div className="absolute capitalize text-white bottom-0 pl-[13px] pb-[17px] text-lg">
              <p>
                @{data.name}, {calculateAge(data.birthday)}
              </p>
              <p className="text-xs">{data.gender}</p>
              <div className="flex gap-1">
                <p className="w-[97px] bg-regal-gray rounded text-center text-xs p-1">
                  {data.horoscope}
                </p>
                <p className="w-[97px] bg-regal-gray rounded text-center text-xs p-1">
                  {data.zodiac}
                </p>
              </div>
            </div>
          </div>

          <div>
            <About />
          </div>
          <div>
            <Interest />
          </div>
        </div>
      </div>
    </>
  );
}
