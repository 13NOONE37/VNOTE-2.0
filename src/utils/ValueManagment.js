const changeInputStateValue = (e, setValue) => {
  setValue(e.target.value);
};
const changeInputReducerValue = (e, setValue) => {
  setValue({ [e.target.name]: e.target.value });
};
const changeReducerValue = (value, setValue, name) => {
  setValue({ [name]: value });
};

export { changeInputStateValue, changeInputReducerValue, changeReducerValue };
