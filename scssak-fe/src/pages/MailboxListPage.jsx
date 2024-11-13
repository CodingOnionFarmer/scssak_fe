import axios from 'axios';

import {BASE_URL} from '../router/Routes';
import {useState, useEffect} from 'react';
import MailboxList from '../components/mailboxlist/MailBoxList';

export default function MailboxListPage() {
  const [data, setData] = useState({
    semester: 0,
    users: [
      {
        user_id: 'scsa23001',
        user_name: '23기 김동규',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23002',
        user_name: '23기 서지은',
        has_new_mail: false,
      },
      {
        user_id: 'scsa23003',
        user_name: '23기 배태용',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23004',
        user_name: '23기 정내혁',
        has_new_mail: true,
      },
      {
        user_id: 'scsa23005',
        user_name: '23기 조예지',
        has_new_mail: true,
      },
    ],
  });

  useEffect(() => {
    axios
      .create({
        baseURL: BASE_URL,
      })
      .get('/mail')
      .then(r => {
        setData(r.data);
      })
      .catch(e => console.log(e));

    console.log('/mail 요청 완료');
  });

  return (
    <div>
      <main>
        <p>💌 {data.semester}기 우체통 💌</p>

        <MailboxList data={data.users} />
      </main>
    </div>
  );
}
