import axios from "axios"
import { useEffect, useState } from "react";

//FAKE API [https://picsum.photos/v2/list ; https://picsum.photos/v2/list?page=2&limit=100]

const getRamdomPhotos =  async (page) => {
  try {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=8`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

const Photos = () => {
  const [ramdomPhotos, setRamdomPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const handleLoadMore = async () => {
    const images = await getRamdomPhotos(nextPage);
    const newPhotos = [...ramdomPhotos, ...images];
    setRamdomPhotos(newPhotos);
    setNextPage(nextPage + 1);
  }

  useEffect(() => {
   handleLoadMore();
  },[])

  return (
    <div className="">
      <div className="grid grid-cols-4 gap-5 p-5">
        {ramdomPhotos.length > 0 && ramdomPhotos.map((item, index) => (
          <div key={item.id} className="p-3 bg-white shadow-md rounded-lg">
            <img src={item.download_url} alt = {item.author} className="w-full h-[200px] object-cover rounded-lg" />
          </div>
        ))}
      </div>
      <div className="text-center">
       <button onClick={handleLoadMore} className="inline-block px-8 py-4 bg-purple-500 text-white rounded-lg">Load more</button>
      </div>
    </div>
   
  )
}

export default Photos