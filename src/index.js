const fs = require("fs");
const express = require("express");
const dotenv = require("dotenv");
const resources = JSON.parse(
	fs.readFileSync(`${__dirname}/data/resources.json`)
);

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

app.get("/resources", (req, res) => {
	res.status(200).json(resources);
});

app.get("/resources", (req, res) => {
	const { category } = req.query;

	res.status(200).json(resources.filter((e) => e.category == category));
});

app.get("/resources/sort", (req, res) => {
	res.status(200).json(resources);
});

app.get("/resources/sort", (req, res) => {
	const { sortBy } = req.query;
	res.status(200).json(resources.sort((a, b) => a[sortBy] - b[sortBy]));
});

app.get("/resources/group", (req, res) => {
	const data = resources.reduce((acc, e) => {
		const { category } = e;
		if (!acc[category]) {
			acc[category] = [];
		}
		acc[category].push(e);
		return acc;
	});
	res.status(200).json(data);
});

module.exports = { app, server }; // Export both app and server
