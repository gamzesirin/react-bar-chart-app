import { useEffect, useState } from 'react'

function App() {
	const getRandomValue = () => {
		return Math.floor(Math.random() * 500) + 1
	}

	const data = [
		{
			id: 1,
			name: 'A ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 7000,
			color: '#00f',
			textColor: '#fff',
			barWidth: 0
		},
		{
			id: 2,
			name: 'B ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 6000,
			color: '#f09',
			textColor: '#fff',
			barWidth: 0
		},
		{
			id: 3,
			name: 'C ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 5000,
			color: '#e90',
			textColor: '#fff',
			barWidth: 0
		},
		{
			id: 4,
			name: 'X ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 4000,
			color: '#fbf',
			textColor: '#fff',
			barWidth: 0
		},
		{
			id: 5,
			name: 'Y ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 2000,
			color: 'green',
			textColor: '#fff',
			barWidth: 0
		},
		{
			id: 6,
			name: 'Z ŞİRKETİ',
			value: getRandomValue(),
			maxValue: 3000,
			color: '#0f0',
			textColor: '#fff',
			barWidth: 0
		}
	]

	function compareValues(key, order = 'asc') {
		return function innerSort(a, b) {
			if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// property doesn't exist on either object
				return 0
			}

			const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
			const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]
			let comparison = 0
			if (varA > varB) {
				comparison = 1
			} else if (varA < varB) {
				comparison = -1
			}
			return order === 'desc' ? comparison * -1 : comparison
		}
	}

	useEffect(() => {
		const timer = setInterval(() => {
			setBarData((prevData) => {
				return prevData.map((item) => {
					if (item.value >= item.maxValue) {
						return item
					} else {
						return {
							...item,
							value: item.value + getRandomValue(),
							barWidth: (item.value / item.maxValue) * 100
						}
					}
				})
			})
		}, 1000)

		return () => {
			clearInterval(timer)
		}
	}, [])

	const [barData, setBarData] = useState(data)

	return (
		<div className="App">
			{barData.sort(compareValues('value', 'asc')).map((item) => (
				<div
					key={item.id}
					className="bar"
					style={{
						width: `${item.barWidth}%`,
						backgroundColor: item.color,
						color: item.textColor,
						fontSize: '1rem',
						borderRadius: '0.5rem'
					}}
				>
					{item.name + ' Değeri : ' + item.value + 'TL'}
				</div>
			))}
		</div>
	)
}

export default App
