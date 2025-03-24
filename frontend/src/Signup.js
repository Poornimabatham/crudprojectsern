import React from "react";

const Signup = () => {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">
            Sign In
          </h2>
          <form action="{{url_for('login')}}" method="post" class="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                required
                placeholder="Enter your username"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter the password"
                class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>
          <p class="text-center text-gray-600 mt-4">
            Don't have an account?
            <a
              href="{{url_for('register')}}"
              class="text-blue-500 hover:underline"
            >
              Sign Up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
