// filter error msg from failed register api response
const filterFormErrorMsg = (errorList = [], searchItem) => {
  const errorMsg = errorList.find((item) => item.path === searchItem);
  if (errorMsg) {
    return errorMsg.msg;
  } else {
    return null;
  }
};

export default { filterFormErrorMsg };
