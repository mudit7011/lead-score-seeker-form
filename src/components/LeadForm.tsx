import { useState } from "react";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function LeadForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/leads", formData);
      setScore(response.data.score);
    } catch (err) {
      console.error("Lead submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className="border px-4 py-2 w-full"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="border px-4 py-2 w-full"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        className="border px-4 py-2 w-full"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        {loading ? "Submitting..." : "Submit"}
      </button>
      {score !== null && <p className="mt-2 text-green-600">Lead Score: {score}</p>}
    </form>
  );
}
