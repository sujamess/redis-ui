import { useState } from 'react';

interface Table<T> {
  columns: string[];
  data: T[];
  dataOffset?: number
}

const Table = <T extends unknown>({ columns, data, dataOffset = 10 }: Table<T>) => {
  // React states declaration
  const [page, setPage] = useState<number>(0);

  if (columns.length === 0 || data.length === 0) {
    return (
      <div className="flex justify-center">
        <p className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-300">No data</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {columns.map((c: string) => (
                      <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                        {c}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3 px-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(page * dataOffset + 1, (page + 1) * dataOffset).map((d: T) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      {columns.map((c: string) => {
                        <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                          {(d as any)[c] || ''}
                        </td>
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing
            <span className="font-semibold text-gray-900 dark:text-white">{Math.min(1, page * dataOffset + 1)}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(10, (page + 1) * dataOffset)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{data.length}</span> Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">

            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setPage(Math.min(0, page - 1))}
            >
              <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Prev
            </button>
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setPage(page + 1)}
              disabled={(page + 1) * dataOffset > data.length}
            >
              Next
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Table;
