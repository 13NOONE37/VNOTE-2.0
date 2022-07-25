const getUniqId = (notes) => {
  const arrayOfIds = notes.map(({ id }) => id);
  return arrayOfIds.sort((a, b) => a - b)[arrayOfIds.length - 1] + 1;
};
export default getUniqId;
