import { useState, useEffect } from 'react'

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height
	}
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

	useEffect(() => {
		function handleResize() {
			console.info("WIDTH: ", getWindowDimensions().width, '\n'
				, "HEIGHT: ", getWindowDimensions().height)
			setWindowDimensions(getWindowDimensions())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return windowDimensions
}
