const mongoose = require('mongoose') 
const cron = require('node-cron')
const fetch = require('node-fetch')
require('dotenv').config()

main().catch(err => {
	console.error(err)
	process.exit(1)
})

async function main () {
	try {
		await mongoose.connect(process.env.MONGODB_URL)
		console.log('connected to mongo...')

		cron.schedule('*/2 * * * *', async () => {
			console.log(`executed at: ${new Date()}`)
			const headlineResponse = 
				await fetch(`http://localhost:3000/v1/headlines/refresh`)
			const headlineData = await headlineResponse.json()

			console.log(`Fetch successful. ${headlineData.length} headlines retrieved.`)
		})
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}
