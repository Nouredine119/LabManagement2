import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Modal, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'

export default function DashArticle() {
  const { currentUser } = useSelector(state => state.user);
  const [userArticle, setUserArticle] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState('');

  useEffect(() => {
    
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:8000/getarticles?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setUserArticle(data.articles);
          if (data.articles.length < 9) {
            setShowMore(false);
          }
        }

      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchArticle();
    }

  }, [currentUser._id,currentUser.isAdmin]);

  const handleShowMore = async () => {
    try {


      const startIndex = userArticle.length;
      const res = await fetch(`http://localhost:8000/getarticles?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserArticle((prev) => [...prev, ...data.articles]);
        if (data.articles.length < 9) {
          setShowMore(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const handleDeleteArticle = async() => {
     setShowModal(false);
     try{
      const res = await fetch(`/deletearticle/${articleIdToDelete}/${currentUser._id}`,
      {
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        setUserArticle((prev)=>{
          return prev.filter((article)=>article._id !==articleIdToDelete) 
        })
      }

     }catch(error){
      console.log(error.message);
     }

  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userArticle.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Article Image</Table.HeadCell>
              <Table.HeadCell>Article Title</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell><span>Edit</span></Table.HeadCell>
            </Table.Head>
            {userArticle.map((article) => (
              <Table.Body key={article._id}  className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    {new Date(article.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/article/${article.slug}`}>
                      <img src={article.image}
                        alt={article.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='lien font-medium text-gray-900' to={`/article/${article.slug}`}>{article.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                        setShowModal(true);
                        setArticleIdToDelete(article._id);
                    }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className='lien text-teal-500 hover:underline' to={`/update-article/${article._id}`}>
                      <span>
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>

                </Table.Row>  
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
              show More
            </button>
          )}
        </>
      ) : (
        <p className='center'>You have no articles yet!</p>
      )}
      <Modal
        show={showModal}
        onClose={() => { setShowModal(false) }}
        popup
        size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this article?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteArticle}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
