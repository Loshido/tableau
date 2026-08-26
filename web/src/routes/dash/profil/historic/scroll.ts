const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let id: number | null = null
export default function animateScroll(target: HTMLElement, targetPosition: number, duration = 1000) {
	if (id) cancelAnimationFrame(id);

	const startPosition = target.scrollLeft;
	const distance = targetPosition - startPosition;
	const startTime = performance.now();

  	function animation(t: number) {
   		const elapsedTime = t - startTime;
     	const progress = Math.min(elapsedTime / duration, 1);

      	target.scrollTo({
			top: 0,
			left: startPosition + distance * easeInOut(progress)
		});

		if (elapsedTime < duration) id = requestAnimationFrame(animation) // next tick
		else id = null // reset
	}

	id = requestAnimationFrame(animation); // first tick
}
