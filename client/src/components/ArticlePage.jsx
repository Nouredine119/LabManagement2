import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Spinner} from 'flowbite-react';
import CommentSection from './CommentSection';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState(false);
 

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/getArticles?slug=${articleSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setArticle(data.articles[0]);
          setError(false);
          setLoading(false);
        }

      } catch (error) {
        setError(true);
        setLoading(false);

      }

    }
    fetchArticle();

  }, [articleSlug]);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size="xl"/>
      </div>
    )
  }
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl
      mx-auto lg:text-4xl'>{article && article.title}</h1>
      <img src={article && article.image} alt={article && article.title} 
      className='mt-10 p-3 max-h-[600px] w-full object-cover'/>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto 
      w-full max-w-2xl text-xs'>
        <span>{article && new Date(article.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{article && (article.content.length/1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-2xl mx-auto w-full article-content' dangerouslySetInnerHTML={{__html:article && article.content}}>
      </div>
      <CommentSection articleId={article._id}/>
    </main>
  )
}
