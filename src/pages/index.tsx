import type { NextPage } from 'next';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { TabEnum } from 'types/enums/tab';

const Input = dynamic(() => import('components/input'));
const FilteringModal = dynamic(() => import('components/modal/filtering'));
const Table = dynamic(() => import('components/table'));
const JsonViewer = dynamic(() => import('components/json-viewer'));

const Home: NextPage = () => {
  // React states declaration
  const [host, setHost] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [db, setDB] = useState<string>('');
  const [tab, setTab] = useState<TabEnum>(TabEnum.Json);

  return (
    <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Redis Credentials</h3>
            <Input
              id="hostCredential"
              type="text"
              label="Host"
              placeholder="127.0.0.1"
              required={true}
              value={host}
              onChange={e => setHost(e.target.value)}
            />
            <Input
              id="portCredential"
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
              id="passwordCredential"
              type="password"
              label="Password"
              placeholder="••••••••"
              required={true}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              id="dbCredential"
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
      </div>
      <div className="md:col-span-2 w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        {/* Alert */}
        <div className="p-4 mb-4 text-sm text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300" role="alert">
          <span className="font-medium">The more</span> filtering you do, <span className="font-medium">the less</span> Redis consumes in terms of resouces.
        </div>

        {/* Filtering Modal */}
        <FilteringModal />

        {/* Data Rendering */}

        <ul className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
          <li className="mr-2" onClick={() => setTab(TabEnum.Json)}>
            <p className={
              `inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg cursor-pointer
              ${tab === TabEnum.Json ? "text-blue-600 bg-gray-100  active dark:bg-gray-800 dark:text-blue-500" : "hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"}
              `}>
              JSON
            </p>
          </li>
          <li className="mr-2" onClick={() => setTab(TabEnum.Table)}>
            <p className={`
              inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg cursor-pointer
              ${tab === TabEnum.Table ? "text-blue-600 bg-gray-100  active dark:bg-gray-800 dark:text-blue-500" : "hover:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"}
            `}>
              Table
            </p>
          </li>
        </ul>

        {tab === TabEnum.Json
          ? <JsonViewer />
          : <Table columns={[]} data={[]} />
        }
      </div>
    </div>
  );
}

export default Home
