import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3050/feed/${id}`)
      .then((res) => setDetail(res.data));
  }, []);

  console.log(detail);

  return <div>{!detail ? <p>Yükleniyor..</p> : <div>{detail.title}</div>}</div>;
};

export default NewsDetail;
