export const useUtils = () => {
  const openCloseModal = (value:boolean): boolean => {
    return !value;
  };

  return {
    openCloseModal,
  };
};
