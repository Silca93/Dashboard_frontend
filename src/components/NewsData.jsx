import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../api';
import NewsLoading from './NewsLoading';

export default function NewsData() {
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null)


    const categoryChanger = (cat) => {
        if (cat === 'all') {
            setCategory(null);  // Set to null when 'all' is selected
        } else {
            setCategory(cat);  // Set category to the selected one
        }
    };
    
   
    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                console.log('Starting news fetch...'); // Debug log

                // Test backend connection first
                const testResponse = await fetch(
                    //!for production
                    `${API_BASE_URL}/api/news`
                );
                console.log('Test response:', testResponse.status); // Debug log

                const categoryQuery = category ? `?&category=${category}` : '';
                // Fetch news
                const url = `${API_BASE_URL}/api/news${categoryQuery}`

                const response = await fetch(
                     //! for produciton 
                    url

                );
                console.log(url);
                
                console.log('News response status:', response.status); // Debug log
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                

                console.log('Received news data:', data); // Debug log
                
                const validArticles = data.articles.filter(article => 
                    article && article.content && article.urlToImage && article.url
                );
                setArticle(validArticles);
           
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message)
            } finally {
                setLoading(false)
            }
        };
        getNews();
    }, [category]);


    if (loading) return <NewsLoading/>
    if (error) return <div>Error: {error}</div>;

    const displayedArticles = article.slice(0, 10);

return (
    <div id='newsOuterBorder' className='w-[40rem] h-[32rem] bg-zinc-100 rounded-xl bg-opacity-55 flex flex-col gap-2 justify-center items-center mb-4'>
        <div id='newsMidBorder' className='w-[36rem] h-[30rem]  flex flex-col gap-2 justify-start items-center overflow-y-scroll overflow-x-hidden scrollable'>
            <div className="flex gap-[3px] justify-center w-full h-auto flex-wrap ">
                <button className='bg-white rounded-xl text-gray-600 font-semibold  p-1 px-2 text-sm bg-opacity-45' onClick={() => categoryChanger('all')}>All</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2  text-sm bg-opacity-45' onClick={() => categoryChanger('science')}>Science</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2 text-sm bg-opacity-45' onClick={() => categoryChanger('health')}>Health</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2  text-sm bg-opacity-45' onClick={() => categoryChanger('technology')}>Tech</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2  text-sm bg-opacity-45' onClick={() => categoryChanger('entertainment')}>Entertainment</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2  text-sm bg-opacity-45' onClick={() => categoryChanger('business')}>Business</button>
                <button className='bg-white rounded-xl text-gray-600 font-semibold px-2  text-sm bg-opacity-45' onClick={() => categoryChanger('sports')}>Sports</button>

            </div>
            {displayedArticles.map((item, key) => (
                <a key={key}  href={item.url} target="_blank">

                    <div id='newsInnerBorder' className='w-[35rem] h-[9rem] bg-white bg-opacity-50 p-2 rounded-xl flex justify-center items-center'>
                        <div className="flex gap-2 w-full h-[10rem]  justify-center items-center">
                            <div className='left w-[10rem] h-full flex justify-center items-center'>
                                <img 
                                    src={item.urlToImage} 
                                    alt={item.title} 
                                    width="100%" 
                                    className='object-cover'
                                    onError={(e) => {
                                        e.target.src = 'placeholder-image-url'; 
                                        e.target.onerror = null; 
                                    }}
                                />
                            </div>
                            <div id='newsDescription' className='right w-[30rem] h-[80%]  flex flex-col justify-center items-center'>
                                <h1 className='font-bold text-sm'>{item.title}</h1>
                                <p className='text-sm'>{item.content.slice(0, 160)}...</p>
                            </div>
                        </div>
                    </div>
                </a>
                ))
            }
        </div>
    </div>
    )
}
