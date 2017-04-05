class CanPromise {
	makeCancelable(promise) {
		let hasCanceled_ = false;
		//封装Promise
		const wrappedPromise = new Promise((resolve, reject) => {
			//promise状态发生改变的时候
			promise.then((val) => hasCanceled_ ? reject({
				isCanceled: true
			}) : resolve(val));
			//当promise发生错误时候
			promise.catch((error) => hasCanceled_ ? reject({
				isCanceled: true
			}) : resolve(error));
		});
		return {
			promise: wrappedPromise,
			cancel() {
				hasCanceled_ = true;
			}
		}
	}
}

export default CanPromise;