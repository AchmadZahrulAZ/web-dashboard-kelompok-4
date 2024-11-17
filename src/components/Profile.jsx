import React from "react";

export default function Profile({ username, name, password }) {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="">
            Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
          value={name}
          readOnly
        />
      </div>
      <div className="mb-4">
      <label htmlFor="">
            Username
        </label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
          value={username}
          readOnly
        />
      </div>
      <div className="mb-4">
      <label htmlFor="">
            Password
        </label>
        <input
          type="text"
          className="mt-1 block w-full border-gray-300 min-h-8 p-2 border-b border-darkblue rounded-md shadow-sm focus:ring focus:ring-darkblue focus:border-darkblue"
          value={password}
          readOnly
        />
      </div>
    </div>
  );
}
