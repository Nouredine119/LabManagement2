import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [article, setArticle] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/getArticle/${articleSlug}`);
        const data = res.json();
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

  }, [articleSlug])
  return (
    <div>ArticlePage</div>
  )
}
