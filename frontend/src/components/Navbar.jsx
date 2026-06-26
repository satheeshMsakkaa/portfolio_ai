import { useNavigate } from "react-router-dom";

export default function Navbar({ investor }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );
    if (!confirmed) return;
    localStorage.removeItem("dashboard");
    navigate("/");
  };

  return (
    <div className="bg-blue-600 text-white p-4 shadow">

      <div className="flex justify-between items-center">

        <h1 className="text-xl font-bold">
          Portfolio AI Dashboard (POC)
        </h1>

        {investor && (
          <div className="flex items-center gap-6">

            <div className="text-right">
              <div className="font-semibold">
                {investor?.name}
              </div>

              <div className="text-sm opacity-80">
                {investor?.email}
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
                bg-red-500
                hover:bg-red-600
                px-4
                py-2
                rounded
                text-sm
                font-medium
                transition
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}