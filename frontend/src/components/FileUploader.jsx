import { useState } from "react";
import API from "../services/api";

export default function FileUploader({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const uploadFile = async () => {
    if (!file || loading) return;

    try {
      setLoading(true);
      setError("");

      setStatus("📤 Uploading Excel file...");

      const formData = new FormData();
      formData.append("file", file);

      setTimeout(() => {
        setStatus("⚙️ Processing portfolio...");
      }, 500);

      const response = await API.post(
        "/dashboard",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setStatus("✅ Portfolio loaded successfully");

      onUploadSuccess(response.data);

    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.detail ||
        "Upload failed. Please try again."
      );

      setStatus("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">

      <h2 className="text-xl font-semibold mb-4">
        Upload Portfolio Excel
      </h2>

      <input
        type="file"
        accept=".xlsx"
        disabled={loading}
        onChange={(e) =>
          setFile(e.target.files[0])
        }
        className="border p-2 rounded w-full"
      />

      <button
        onClick={uploadFile}
        disabled={!file || loading}
        className={`
          mt-4
          px-4
          py-2
          rounded
          text-white
          transition

          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {loading
          ? "Processing..."
          : "Upload"}
      </button>

      {status && (
        <div className="mt-4 text-blue-600 font-medium">
          {status}
        </div>
      )}

      {error && (
        <div className="mt-4 text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-4 flex items-center gap-2">

          <div
            className="
            animate-spin
            rounded-full
            h-5
            w-5
            border-b-2
            border-blue-600
            "
          />

          <span>
            Please wait...
          </span>

        </div>
      )}

    </div>
  );
}