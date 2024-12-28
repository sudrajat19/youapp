import { useEffect, useState } from "react";
import SettingAbout from "./settingAbout";
import axios from "axios";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import formatDate from "@/atom/formatDate";
import calculateAge from "@/atom/formatAge";

export default function About() {
  const [data, setData] = useState({});
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      push("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setId(decoded.id);
    } catch (error) {
      console.error("Token tidak valid:", error);
      push("/");
    }
  }, [push]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/showprofile/${id}`
        );
        setData(response.data[0]);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleEdit = () => setEdit((prev) => !prev);

  const handleSave = (newData) => {
    setData(newData);
    setEdit(false);
  };

  return (
    <div className="mx-auto w-full p-2">
      <div
        className={`${
          edit ? "hidden" : "block"
        } relative mx-auto rounded-lg bg-bck shadow-lg`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-white text-lg font-semibold">About</h1>
          <img
            onClick={toggleEdit}
            src="/images/toolsedit.png"
            className="w-5 h-5 cursor-pointer"
            alt="Edit"
          />
        </div>
        <div className="p-4">
          {Object.keys(data).length > 0 ? (
            <div className="text-white space-y-2">
              <p>
                <span className="text-gray-400">Birthday:</span>{" "}
                {formatDate(data.birthday)} (Age: {calculateAge(data.birthday)})
              </p>
              <p>
                <span className="text-gray-400">Horoscope:</span>{" "}
                {data.horoscope}
              </p>
              <p>
                <span className="text-gray-400">Zodiac:</span> {data.zodiac}
              </p>
              <p>
                <span className="text-gray-400">Height:</span> {data.height} cm
              </p>
              <p>
                <span className="text-gray-400">Weight:</span> {data.weight} kg
              </p>
            </div>
          ) : (
            <p className="text-gray-400">
              Add in your details to help others know you better.
            </p>
          )}
        </div>
      </div>
      {edit && <SettingAbout data={data} onSave={handleSave} />}
    </div>
  );
}
