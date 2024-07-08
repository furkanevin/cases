const removeDuplicates = (arr, key) => {
  const newArr = arr.map((job) => job[key]);

  const filtred = newArr
    .filter((item, index) => newArr.indexOf(item) === index)
    .sort();

  const options = filtred.map((i) => ({
    label: key === 'duration' ? i + ' year' : i,
    value: i,
  }));

  return options;
};

export default removeDuplicates;
