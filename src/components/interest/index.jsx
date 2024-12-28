import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Interest() {
  const { push } = useRouter();
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  console.log(data, "asdsa");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      push("/");
      return;
    }

    try {
      const decode = jwtDecode(token);
      if (decode && decode.id) {
        setId(decode.id);
      } else {
        throw new Error("Invalid token");
      }
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
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/showinterest/${id}`
        );
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching interest data:", error);
      }
    };

    fetchData();
  }, [id]);

  const toggleEdit = () => {
    push("/settingInterest");
  };
  const handleRemoveInterest = async (interestId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/delete/interest/${interestId}`
      );
      setData((prevData) =>
        prevData.filter((interest) => interest.id_interest !== interestId)
      );
    } catch (error) {
      console.error("Error removing interest:", error);
    }
  };

  return (
    <div className="mx-auto w-96">
      <div className="max-w-[359px] relative mx-auto rounded bg-bck">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="text-white text-lg font-semibold">Interest</h1>
          <img
            onClick={toggleEdit}
            src="/images/toolsedit.png"
            className="w-4 h-4 my-auto cursor-pointer"
            alt="Edit"
          />
        </div>
        <div className="p-4">
          {data.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.map((dt, index) => (
                <div
                  key={index + 1}
                  className="flex items-center gap-2 px-3 py-1 rounded bg-gray-700 text-center text-white"
                >
                  {dt.interest}
                  <button
                    onClick={() => handleRemoveInterest(dt.id_interest)}
                    className="text-gray-700 hover:text-red-500 hover:font-bold"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">
              Add your interests to find a better match
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
