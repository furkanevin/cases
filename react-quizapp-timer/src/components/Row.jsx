const Row = ({ item, answers }) => {
  const found = answers.find((i) => i.question === item.id - 1);

  const isCorrect = !found
    ? false
    : item.correctAnswer === answers[item.id - 1].answer.slice(0, 1);

  return (
    <tr className=" border-b bg-gray-800 border-gray-700">
      <th className="px-6 py-4 font-medium whitespace-nowrap text-white">
        Soru {item.id}
      </th>
      <td className="px-6 py-4">{!found ? 'boş' : found.answer}</td>
      <td className="px-6 py-4">{item.correctAnswer}</td>
      <td
        className={`
      ${isCorrect ? 'text-green-500' : 'text-red-500'}
      px-6 py-4`}
      >
        {isCorrect ? 'Doğru' : 'Yanlış'}
      </td>
    </tr>
  );
};

export default Row;
