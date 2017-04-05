import CanPromise from '../tool/CanPromise';
export default function(http) {
	let canPromise = new CanPromise();
	let cancelable = canPromise.makeCancelable(fetch(http));

	function postFetch() {
		//console.log(http);
		//取消异步请求
		let result = cancelable
			.promise
			.then((response) => response.json())
			.then((responseData) => {
				//console.log(responseData.data);
				result = responseData;
				return responseData;
			})
			.catch(({
				isCanceled,
				...error
			}) => console.log('isCanceled', isCanceled));
		return result;
	}

	function cancel() {
		if (cancelable) {
			cancelable.cancel();
		}
	}
	return {
		postFetch: postFetch,
		cancel: cancel
	}
};