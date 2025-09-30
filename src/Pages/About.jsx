import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../Components";

const About = () => {
  return (
    <Container>
      <div className="bg-gray-200 flex flex-col my-10 items-center justify-center px-4 md:px-12 pb-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <header className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight">
              Welcome to ThinkShare: Your Platform to Express, Connect, and Grow
            </h1>
            <p className="mt-3 text-xl text-gray-600">
              A place where ideas thrive and voices are heard. Join the community of passionate creators today!
            </p>
          </header>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Express Yourself */}
            <div className="bg-white shadow-lg rounded-lg p-10 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Express Yourself✨</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ThinkShare allows you to express yourself freely through your personal blog. Whether it's your opinions, stories, or creative ideas, the platform gives you the freedom to share what matters most to you.
              </p>
            </div>

            {/* Stay Connected */}
            <div className="bg-white shadow-lg rounded-lg p-10 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Stay Connected🔁</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                ThinkShare isn't just a blog platform – it's a community. Connect with like-minded individuals, engage with their content, and form meaningful relationships that could shape your creative journey.
              </p>
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Create and Update Posts */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Create and Update Posts📝</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Effortlessly create and update your posts. Whether you're sharing a personal story, a helpful guide, or simply expressing your thoughts, ThinkShare makes it easy to keep your readers updated with fresh content.
              </p>
            </div>

            {/* Join ThinkShare */}
            <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">Join ThinkShare Today😎</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Ready to start sharing your voice with the world? Sign up today and become a part of our vibrant and passionate community. ThinkShare is here to help you grow and connect with others who share your passion.
              </p>
              <div className="flex justify-start mt-6">
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 mr-4"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default About;
