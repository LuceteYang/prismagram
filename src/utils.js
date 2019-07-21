import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });
import { adjectives, nouns } from './words';
import nodemailer from 'nodemailer';

export const generateSecret = () => {
	const randomNumber = Math.floor(Math.random() * adjectives.length);
	return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
	const options = {
		service: process.env.MAIL_SERVICE,
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASSWORD,
		}
	};
	const client = nodemailer.createTransport(options);
	return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
	const email = {
		from: 'jae6120@naver.com',
		to: adress,
		subject: '🔒Login Secret for Prismagram🔒',
		html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
	};
	return sendMail(email);
};
