const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('./api');
const { default: axios } = require('axios');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const DATABASE_URL = process.env.DATABASE_URL;
const pgp = PgPromise({});
const db = pgp(DATABASE_URL);

(async()=> {
	console.log(await db.many("SELECT count(*) FROM garment;"));
})()
API(app, db);

const PORT = process.env.PORT || 4017;

// API routes to be added here

app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});