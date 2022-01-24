import type { NextPage } from 'next';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const Input = dynamic(() => import('components/input'));
const FilteringModal = dynamic(() => import('components/modal/filtering'));
const Table = dynamic(() => import('components/table'));

const Home: NextPage = () => {
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [db, setDB] = useState<string>('');

  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Redis Credentials</h3>
          <Input
            type="text"
            label="Host"
            placeholder="127.0.0.1"
            required={true}
            value={host}
            onChange={e => setHost(e.target.value)}
          />
          <Input
            type="number"
            label="Port"
            placeholder="6379"
            required={true}
            min={0}
            max={9999}
            value={port}
            onChange={e => setPort(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            placeholder="••••••••"
            required={true}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            type="number"
            label="DB"
            placeholder="0"
            required={true}
            min={0}
            max={15}
            value={db}
            onChange={e => setDB(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Connect
          </button>
        </form>
      </div>
      <div className="md:col-span-2 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        {/* Alert */}
        <div className="p-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
          <span className="font-medium">The more</span> filtering you do, <span className="font-medium">the less</span> Redis consumes in terms of resouces.
        </div>

        {/* Filtering Modal */}
        <FilteringModal />

        {/* Data Rendering */}
        <Table />
      </div>
    </div>
  );
}

export default Home
