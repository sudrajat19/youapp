import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function SettingInterest() {
  const { push } = useRouter();
  const [interests, setInterests] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [id_users, setId] = useState([]);

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

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/create/interest`,
        {
          id_users,
          interests,
        }
      );
      alert("Interests saved successfully!");
      push("/profile");
    } catch (error) {
      console.error("Error saving interests:", error);
      alert("Failed to save interests.");
    }
  };

  const handleAddInterest = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "" && !interests.includes(inputValue)) {
      setInterests([...interests, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter((item) => item !== interest));
  };

  return (
    <div className="pt-[100px] py-2 bg-gradient-to-r h-screen from-regal-black from-10% via-regal-dark via-50% to-regal-gray to-100%">
      <div className="grid gap-2 mx-auto w-96">
        <div className="flex gap-2 justify-between p-2">
          <div className="flex px-2 gap-2">
            <img src="/images/left.png" className="w-2 h-4 my-auto" />
            <p
              onClick={() => push("/profile")}
              className="flex gap-2 cursor-pointer text-lg text-white my-auto"
            >
              Back
            </p>
          </div>
          <button
            onClick={handleSubmit}
            className="font-semibold bg-multi-color-blue bg-clip-text text-transparent text-lg my-auto ml-[60px] text-center"
          >
            Save
          </button>
        </div>
        <div className="mt-20 p-2">
          <p className="text-lg font-bold bg-multi-color-text bg-clip-text text-transparent">
            Tell everyone about yourself
          </p>
          <h1 className="text-xl text-white font-bold">What interest you?</h1>
        </div>
        <div className="w-[324px] relative h-auto mx-auto rounded bg-bck p-2">
          <form onSubmit={handleAddInterest} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add your interest"
              className="w-full px-2 py-1 rounded bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="px-4 py-1 rounded bg-multi-color-blue text-white"
            >
              Add
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded bg-gray-700 text-white"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="text-red-500 font-bold"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
