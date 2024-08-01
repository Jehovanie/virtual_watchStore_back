import { config } from "dotenv";

// Configuration of dotenv
if(!process.env.PORT) {
    config({
        path: process.env.NODE_ENV || ".env"
    });
}

export const environment = {
	PORT: process.env.PORT,
	ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
};
