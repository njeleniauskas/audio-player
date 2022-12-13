function valueInArray(valueChecked, array) {
	return array.some((indexValue) => valueChecked === indexValue);
}

export default valueInArray;