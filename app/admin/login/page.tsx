import { Input } from "antd"

const AdminLoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@batobaye.com"
              required
              defaultValue="admin@batobaye.com" // Ajout ou mise à jour de cette ligne
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-batobaye-primary focus:border-batobaye-primary transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-batobaye-primary focus:border-batobaye-primary transition-all duration-300"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-batobaye-primary text-white py-2 px-4 rounded-lg hover:bg-batobaye-secondary transition-all duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLoginPage
