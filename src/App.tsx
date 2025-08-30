import { useQuery } from '@tanstack/react-query';
import { fetchGetUsers, fetchGetcatfacth, completeData } from './utils.js';
import { RandomUserResponse, CatFactsResponse, MixedData } from './Interfaces.tsx';
function App() {

  //Se hacen los llamados a las APIs
   const catFacts = useQuery<CatFactsResponse>({
    queryKey: ['catFacts'], 
    queryFn: fetchGetcatfacth,
  });

    const users = useQuery<RandomUserResponse>({
    queryKey: ['users'], 
    queryFn: fetchGetUsers,
  });

  const isloading = catFacts.isLoading || users.isLoading;
  if (isloading) {
    return <LoadingUsers/>;
  }

  const isError = catFacts.isError || users.isError;
  const error = catFacts.error || users.error;
  if (isError||error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-300">
        <p >Disculpa los inconvenientes a ocurrido un error </p> 
      </div>
    );
  }

  const catFactsData = catFacts.data;
  const usersData = users.data;

  const data = completeData(catFactsData!, usersData!);
  //renderUsers(data)
  // function LoadingUsers(){
  //   const items = 10;
  //   return (
  //     <div className='flex justify-center bg-gray-300 '>
  //         <div className='grid grid-cols-1 gap-4 p-4  w-full max-w-lg'>
  //         {Array.from({ length: items }).map((_, index) => (
  //           <div key={index} className='bg-white rounded-lg shadow-md p-4 w-full mx-auto animate-pulse'>
  //             <div className='flex items-center gap-4 p-4'>
  //               <img src={''} alt={``} className='w-8 h-8 rounded-full' />
  //               <h2 className='text-xl font-semibold'></h2>
  //             </div>
  //             <p className='text-gray-600 text-left mb-4'></p>
  //             <div className='text-sm text-gray-500'>
  //               <p className='w-full'><strong>Email:</strong> </p>
  //               <p className='w-full'><strong>Phone:</strong> </p>
  //               <p className='w-full'><strong>Location:</strong> </p>
  //             </div>
  //           </div>
  //         ))}
  //         </div>      

  //     </div>

  //   )
  // }
  function LoadingUsers() {
    const items = 10;
    return (
      <div className='flex justify-center bg-gray-300 min-h-screen'> 
          <div className='grid grid-cols-1 gap-4 p-4  w-full max-w-lg'>
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className='bg-white rounded-lg shadow-md p-4 w-full mx-auto animate-pulse'>
              <div className='flex items-center gap-4 p-4'>
                <div className='w-8 h-8 rounded-full bg-gray-200'></div> 
                <div className='h-6 bg-gray-200 w-3/4 rounded'></div> 
              </div>
              <div className='h-4 bg-gray-200 w-full rounded mb-4'></div>
              <div className='text-sm text-gray-500'>
                <div className='h-4 bg-gray-200 w-full rounded'></div> 
                <div className='h-4 bg-gray-200 w-5/6 rounded mt-2'></div> 
                <div className='h-4 bg-gray-200 w-1/2 rounded mt-2'></div> 
              </div>
            </div>
          ))}
          </div>      
      </div>
    )
  }

  

  function RenderUsers({ data }: { data: MixedData }) {
    console.log('Paco: renderusers', data, data.data.length);
    return (
      <div className='flex justify-center bg-gray-300 '>
        <div className='grid grid-cols-1 gap-4 p-4'>
          {data.data.map((item, index) =>  (
            
            <div key={index} className='bg-white rounded-lg shadow-md p-4  w-1/2 mx-auto'>
              <div className='flex items-center gap-4 p-4'>
              <img src={item.user.picture.large} alt={`${item.user.name}`} className='w-8 h-8 rounded-full' />
              <h2 className='text-xl font-semibold'>{`${item.user.name.first} ${item.user.name.last}`}</h2>
              </div>
              <p className='text-gray-600 text-left mb-4'>{item.catFact}</p>
              <div className='text-sm text-gray-500'>
                <p><strong>Email:</strong> {item.user.email}</p>
                <p><strong>Phone:</strong> {String(item.user.phone)}</p>
                <p><strong>Location:</strong> {`${item.user.location.city}, ${item.user.location.country}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
        <RenderUsers data={{ data }} />
  )
}

export default App
