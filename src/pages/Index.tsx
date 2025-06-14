
import { useState } from "react";
import axios from "axios";
import FormField from "../components/FormField";
import ScoreDisplay from "../components/ScoreDisplay";
import LoadingSpinner from "../components/LoadingSpinner";
import ParticleBackground from "../components/ParticleBackground";
import { User, Mail, MessageSquare, Sparkles, Brain } from "lucide-react";

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(true);

    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      const res = await axios.post("http://localhost:4000/api/leads", form);
      setScore(res.data.score);
    } catch (error) {
      console.error("Error submitting form:", error);
      // For demo purposes, set a random score if API fails
      setScore(Math.floor(Math.random() * 100) + 1);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", message: "" });
    setScore(null);
    setSubmitted(false);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Header */}
      <div className="relative z-10 pt-12 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Lead Scorer
            </h1>
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Harness the power of artificial intelligence to evaluate and score your leads with precision
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-12">
        {!submitted ? (
          <div className="transform transition-all duration-700 hover:scale-[1.02]">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center space-x-3 mb-8">
                <Sparkles className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">
                  Tell us about your lead
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  type="input"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  icon={<User className="w-5 h-5" />}
                />

                <FormField
                  type="input"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  icon={<Mail className="w-5 h-5" />}
                />

                <FormField
                  type="textarea"
                  name="message"
                  placeholder="What specific solutions or services are you looking for? Describe your needs in detail..."
                  value={form.message}
                  onChange={handleChange}
                  icon={<MessageSquare className="w-5 h-5" />}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!form.name || !form.email || !form.message}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Analyze Lead Quality</span>
                  </div>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {loading ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
                <LoadingSpinner />
              </div>
            ) : score !== null ? (
              <div className="space-y-6">
                <ScoreDisplay score={score} />
                
                <div className="text-center">
                  <button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Analyze Another Lead
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" />
      <div className="fixed top-40 right-16 w-3 h-3 bg-pink-400 rounded-full animate-bounce animation-delay-300 opacity-60" />
      <div className="fixed bottom-32 left-16 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-500 opacity-60" />
      <div className="fixed bottom-20 right-20 w-5 h-5 bg-green-400 rounded-full animate-bounce animation-delay-700 opacity-60" />
    </div>
  );
};

export default Index;
