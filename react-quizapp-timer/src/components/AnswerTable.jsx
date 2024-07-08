import Row from './Row';

const AnswerTable = ({ questions, answers }) => {
  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-3xl my-5">Verdiğiniz Cevaplar</h1>
      <table className="w-full text-sm text-left  text-gray-400">
        <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
          <tr>
            <th className="px-6 py-3">Soru</th>
            <th className="px-6 py-3">Verdiğiniz Cevap</th>
            <th className="px-6 py-3">Doğru Cevap</th>
            <th className="px-6 py-3">Durum</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item, i) => (
            <Row questions={questions} answers={answers} item={item} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnswerTable;
