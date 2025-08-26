import { FcGoogle } from "react-icons/fc";

export default function AuthButton() {
  return (
    <button className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-900 transition">
      <FcGoogle size={20} />
      <span>Entrar com Google</span>
    </button>
  );
}
