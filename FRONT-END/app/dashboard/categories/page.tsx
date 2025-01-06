import Link from 'next/link'
import axiosInstance from '@/lib/axios'
import { cookies } from 'next/headers';

import { DeleteCategory } from './DeleteCategory';
import CategoryModal from './CategoryModal';


export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('jwt'); // Retrieve the JWT token from cookies

  const response = await axiosInstance.get('/category', {
    headers: {
      Authorization: `Bearer ${userCookie?.value}`,
    },
  });
  const { data } = response

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="mb-4 font-bold text-3xl">Categories</h1>
        <CategoryModal Action="Add" title='Add Catgory' Style='px-3 bg-default rounded-lg hover:opacity-90 py-2 h-10' Name='' id={undefined} />
      </div>


      <div className="shadow-md rounded-lg overflow-x-auto">
        <table className="bg-white min-w-full dark:text-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 border-b text-start">Name</th>
              <th className="px-4 py-3 border-b text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category: any) => (
              <tr key={category.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2 border-b">{category.name}</td>
                <td className="px-4 py-2 border-b">
                  <CategoryModal Action="edit" Name={category.name} Style='text-blue-500 hover:underline' id={category.id} title='Edit' />
                  {/* <Link className='text-blue-500 hover:underline' href={`/dashboard/categories/edit/${category.id}`}>
                    Edit
                  </Link> */}

                  <DeleteCategory id={category.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
