import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TabEnum } from 'types/enums/tab';
import {
  advanceSearchFieldInputState,
  advanceSearchValueInputState,
  dataTypeInputState,
  keyPatternInputState,
} from 'states/input';
import { useRecoilState, useRecoilValue } from 'recoil';
import { redisValueState } from 'states/redis';

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
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  // Recoil states declaration
  const keyPattern = useRecoilValue(keyPatternInputState);
  const dataType = useRecoilValue(dataTypeInputState);
  const advanceSearchField = useRecoilValue(advanceSearchFieldInputState);
  const advanceSearchValue = useRecoilValue(advanceSearchValueInputState);
  const [redisValue, setRedisValue] = useRecoilState(redisValueState);

  useEffect(() => {
    // Fetching a data from Redis here
  }, [keyPattern, dataType, advanceSearchField, advanceSearchValue]);

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
        <div className="w-full">
          <div className="flex justify-end">
            {/* Filter button */}
            {isFiltering
              ? (
                <button
                  className="block text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  type="button"
                  data-modal-toggle="filtering-modal"
                >
                  Filter
                </button>
              )
              : (
                <button disabled={true} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                  <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                  </svg>
                  Filtering...
                </button>
              )
            }
          </div>
        </div>
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
          ? <JsonViewer src={redisValue} />
          : <Table columns={redisValue.length > 0 ? Object.keys(redisValue[0]) : []} data={redisValue} />
        }
      </div>
    </div>
  );
}

export default Home
