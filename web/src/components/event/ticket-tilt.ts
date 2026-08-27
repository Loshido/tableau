const maxTilt = 5;
const perspective = 1000;
export default (target: HTMLElement) => {
	function onMouseEnter(_event: MouseEvent) {
		target.style.transition = "transform .5s ease-out";
	}

	function onMouseMove(event: MouseEvent) {
		const rect = target.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const rotateX = ((y - centerY) / centerY) * -maxTilt;
		const rotateY = ((x - centerX) / centerX) * maxTilt;

		target.style.transition = "transform 0ms";
		target.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	}

	function onMouseLeave(_event: MouseEvent): void {
		target.style.transition = "transform .5s ease-out";
		target.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
	}

	return { onMouseEnter, onMouseLeave, onMouseMove }
}
