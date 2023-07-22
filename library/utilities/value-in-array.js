function valueInArray(array, valueChecked) {
	return array.some((indexValue) => valueChecked === indexValue);
}

export default valueInArray;